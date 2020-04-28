import React, { Suspense } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { Topbar } from './components';
import { Footer } from '../Main/components';
import LoadingScreen from '../../components/LoadingScreen';

const useStyles = makeStyles((theme: any) => ({
  root: {
    paddingTop: 64,
    height: '100%',
  },
  content: {
    height: '100%',
    backgroundColor: theme.palette.background.dark,
  },
}));

const Minimal = (props: any) => {
  const { children } = props;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Topbar />
      <Suspense fallback={<LoadingScreen />}>
        <main className={classes.content}>{children}</main>
        <Footer />
      </Suspense>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default Minimal;
