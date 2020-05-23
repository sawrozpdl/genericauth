import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import UserContext from '../../context/UserContext';

import { AccountProfile, AccountDetails, LocationDetails } from './components';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(4),
    minHeight: '100vh',
  },
}));

const Account = () => {
  const user: any = useContext(UserContext);
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={4}>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <AccountProfile user={user} />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <AccountDetails user={user} />
        </Grid>
        <Grid item lg={4} md={6} xl={4} xs={12}>
          <div />
        </Grid>
        <Grid item lg={8} md={6} xl={8} xs={12}>
          <LocationDetails location={user.location} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Account;
