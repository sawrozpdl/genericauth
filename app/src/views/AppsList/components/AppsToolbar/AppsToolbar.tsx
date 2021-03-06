import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';
import routes from '../../../../constants/routes';

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
  searchInput: {
    marginRight: theme.spacing(1),
  },
}));

const AppsToolbar = (props: any) => {
  const { className, history, onSearch, ...rest } = props;

  const classes = useStyles();

  return (
    <div {...rest} className={clsx(classes.root, className)}>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          onSearch={onSearch}
          placeholder="Search app"
        />
        <span className={classes.spacer} />
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            history.push(routes.CREATE_APP);
          }}
        >
          <h4>Create App</h4>
        </Button>
      </div>
    </div>
  );
};

AppsToolbar.propTypes = {
  className: PropTypes.string,
  onSearch: PropTypes.func,
};

export default AppsToolbar;
