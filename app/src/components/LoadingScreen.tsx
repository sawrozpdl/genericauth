import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, LinearProgress, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme: any) => ({
  root: {
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    minHeight: '90vh',
    padding: theme.spacing(3),
  },
}));

function LoadingScreen() {
  const classes = useStyles();

  useEffect(() => {
    NProgress.start();

    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div className={classes.root}>
      <Box width={500}>
        <LinearProgress />
      </Box>
    </div>
  );
}

export default LoadingScreen;
