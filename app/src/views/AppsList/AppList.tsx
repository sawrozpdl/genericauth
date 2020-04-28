import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { IconButton, Grid, Typography } from '@material-ui/core';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import { AppsToolbar, AppCard } from './components';
import mockData from './data';

const useStyles = makeStyles((theme: any) => ({
  root: {
    padding: theme.spacing(3),
    minHeight: '100vh',
  },
  content: {
    marginTop: theme.spacing(2),
  },
  pagination: {
    marginTop: theme.spacing(3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
}));

const AppList = (props: any) => {
  const classes = useStyles();

  const [apps] = useState(mockData);

  return (
    <div className={classes.root}>
      <AppsToolbar {...props} />
      <div className={classes.content}>
        <Grid container spacing={3}>
          {apps.map((app) => (
            <Grid item key={app.id} lg={4} md={6} xs={12}>
              <AppCard app={app} {...props} />
            </Grid>
          ))}
        </Grid>
      </div>
      <div className={classes.pagination}>
        <Typography variant="caption">1-6 of 20</Typography>
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default AppList;
