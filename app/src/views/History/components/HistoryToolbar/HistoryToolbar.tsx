import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button, Typography, capitalize } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import RefreshIcon from '@material-ui/icons/Refresh';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { extractFullName } from '../../../../utils/string';

const useStyles = makeStyles((theme: any) => ({
  root: {},
  row: {
    height: '42px',
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  selectUser: { marginLeft: theme.spacing(1) },
  actionBtn: { marginLeft: theme.spacing(1) },
  importButton: {
    marginRight: theme.spacing(1),
  },
  exportButton: {
    marginRight: theme.spacing(1),
  },
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

const toValue = (user: any) => (user ? `users/${user.id}` : '');

const HistoryToolbar = (props: any) => {
  const {
    className,
    users,
    selectedUser,
    onUserChange,
    isAdmin,
    onRefresh,
    onExport,
    ...rest
  } = props;

  const classes: any = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        {users && (
          <>
            <Typography variant="h5">{'Showing history for '}</Typography>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              value={selectedUser}
              disabled={!isAdmin}
              className={classes.selectUser}
              onChange={onUserChange}
              label="Age"
            >
              <MenuItem value="ALL">
                <em>All</em>
              </MenuItem>
              {users.map((user: any) => (
                <MenuItem key={user.id} value={toValue(user)}>
                  {extractFullName(user) || capitalize(user.username)}
                </MenuItem>
              ))}
            </Select>
          </>
        )}
        <span className={classes.spacer} />
        <IconButton size="small" onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>

        {isAdmin && (
          <>
            <Button className={classes.exportButton} onClick={onExport}>
              {'Export'}
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

HistoryToolbar.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array,
  selectedUser: PropTypes.any,
  onUserChange: PropTypes.func,
  onRefresh: PropTypes.func,
  onExport: PropTypes.func,
  isAdmin: PropTypes.bool,
};

export default HistoryToolbar;
