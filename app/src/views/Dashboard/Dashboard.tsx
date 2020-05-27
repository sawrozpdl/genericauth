import React, { useEffect, useCallback, useState } from 'react';
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

  const { appName } = props.match.params;

  const [loading, setLoading] = useState(true);
  const [app, setApp] = useState(null);

  console.log(app);

  const fetchAppsAndUsers = useCallback(async () => {
    try {
      setLoading(true);
      const app = await fetchApp(appName);
      const usersPage = await fetchUsersInApp(appName, { size: 1000 });
      app.users = usersPage.content;
      setApp(app);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
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
            <TotalUsers />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Registrations />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <ProfileCompletion />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <TotalRequests />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <RequestsOverTime />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <RequestsByType />
          </Grid>
          <Grid item lg={6} md={6} xl={6} xs={12}>
            <RecentEvents />
          </Grid>
          <Grid item lg={6} md={12} xl={6} xs={12}>
            <RecentUsers />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Dashboard;
