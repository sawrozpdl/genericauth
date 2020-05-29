import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import BlockIcon from '@material-ui/icons/Block';
import RefreshIcon from '@material-ui/icons/Refresh';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

import PublicIcon from '@material-ui/icons/Public';

import { SearchInput } from '../../../../components';

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
  extraOpt: { marginLeft: theme.spacing(2) },
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

const UsersToolbar = (props: any) => {
  const {
    className,
    onSearch,
    onAddUserClick,
    selectedUsers,
    onDeactivateClick,
    onDeleteClick,
    isAdmin,
    onExport,
    onRefresh,
    active,
    setActive,
    ...rest
  } = props;

  const classes: any = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search user"
          onSearch={onSearch}
        />
        {isAdmin && (
          <>
            {' '}
            <ToggleButtonGroup
              size="small"
              value={active}
              exclusive
              onChange={setActive}
              aria-label="text alignment"
            >
              <ToggleButton
                value={true}
                aria-label="left aligned"
                disabled={selectedUsers.length}
              >
                <PublicIcon />
              </ToggleButton>
              <ToggleButton
                value={false}
                aria-label="centered"
                disabled={selectedUsers.length}
              >
                <BlockIcon />
              </ToggleButton>
            </ToggleButtonGroup>
            {selectedUsers && selectedUsers.length ? (
              <div className={classes.extraOpt}>
                <Button
                  color="default"
                  variant="outlined"
                  className={classes.actionBtn}
                  startIcon={<BlockIcon />}
                  onClick={onDeactivateClick}
                >
                  {active ? 'Deactivate' : 'Activate'}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  className={classes.actionBtn}
                  onClick={onDeleteClick}
                  startIcon={<DeleteIcon />}
                >
                  {'Delete'}
                </Button>
              </div>
            ) : null}
          </>
        )}
        <span className={classes.spacer} />
        <IconButton size="small" onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>

        {isAdmin && (
          <>
            <Button className={classes.exportButton} onClick={onExport}>
              Export
            </Button>
            <Button color="primary" variant="outlined" onClick={onAddUserClick}>
              Add user
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func,
  onRefresh: PropTypes.func,
  onExport: PropTypes.func,
  isAdmin: PropTypes.bool,
  active: PropTypes.bool,
  onDeactivateClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
  selectedUsers: PropTypes.array,
  setActive: PropTypes.func,
  onAddUserClick: PropTypes.func,
};

export default UsersToolbar;
