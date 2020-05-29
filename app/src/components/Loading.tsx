import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

interface LoadingInterface {
  height: number;
}

const Loading: React.FC<LoadingInterface> = (props: LoadingInterface) => {
  const { height } = props;

  const useStyles = makeStyles(() => ({
    loading: {
      width: '40px',
      height: '40px',
      textAlign: 'center',
      position: 'absolute',
      left: '50%',
      top: '50%',
    },
    loadingContainer: {
      position: 'relative',
      height: height ? `${height}px` : '100px',
    },
  }));

  const classes = useStyles();

  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    </div>
  );
};

export default Loading;
