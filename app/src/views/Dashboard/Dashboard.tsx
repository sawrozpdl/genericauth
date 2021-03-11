import React, { useEffect, useCallback, useState, useContext } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

import {
  Registrations,
  TotalUsers,
  ProfileCompletion,
  TotalRequests,
  RequestsByType,
  RecentEvents,
  RecentUsers,
  RequestsOverTime,
} from './components';
import { fetchApp, fetchUsersInApp } from '../../services/app';
import UserContext from '../../context/UserContext';
import { handleError } from '../../utils/error';
import Loading from '../../components/Loading';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(4),
    minHeight: '100vh',
  },
}));

const Dashboard = (props: any) => {
  const classes = useStyles();

  const userCtx: any = useContext(UserContext);
  const { activeApp: appName } = userCtx.user;

  const [loading, setLoading] = useState(true);
  const [app, setApp] = useState(null);

  const fetchAppsAndUsers = useCallback(async () => {
    try {
      setLoading(true);
      const app = await fetchApp(appName, {
        detail: true,
      });
      const usersPage = await fetchUsersInApp(appName, { size: 1000 });
      const inUsersPage = await fetchUsersInApp(appName, {
        size: 1000,
        active: false,
      });
      app.users = [...usersPage.content, ...inUsersPage.content];
      setApp(app);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }

    // eslint-disable-next-line
  }, [appName]);

  useEffect(() => {
    fetchAppsAndUsers();
  }, [fetchAppsAndUsers]);

  return (
    <div className={classes.root}>
      {loading ? (
        <Loading height={700} />
      ) : (
        <Grid container spacing={4}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalUsers app={app} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Registrations app={app} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <ProfileCompletion app={app} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalRequests app={app} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <RequestsOverTime app={app} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <RequestsByType app={app} />
          </Grid>
          <Grid item lg={4} md={6} xl={4} xs={12}>
            <RecentUsers app={app} {...props} />
          </Grid>
          <Grid item lg={8} md={12} xl={8} xs={12}>
            <RecentEvents app={app} {...props} />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Dashboard;
