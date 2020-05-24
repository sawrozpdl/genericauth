import React, { Suspense, useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/styles';
import { useMediaQuery } from '@material-ui/core';
import { Sidebar, Topbar, Footer } from './components';
import LoadingScreen from '../../components/LoadingScreen';

const useStyles = makeStyles((theme: any) => ({
  root: {
    paddingTop: 56,
    height: '100%',
    [theme.breakpoints.up('sm')]: {
      paddingTop: 64,
    },
  },
  shiftContent: {
    paddingLeft: 240,
  },
  content: {
    height: '100%',
    backgroundColor: theme.palette.background.dark,
  },
}));

const Main = (props: any) => {
  const { children } = props;

  const classes = useStyles();
  const theme: any = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'), {
    defaultMatches: true,
  });

  const [openSidebar, setOpenSidebar] = useState(false);

  const handleSidebarOpen = () => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = () => {
    setOpenSidebar(false);
  };

  const shouldOpenSidebar = isDesktop ? true : openSidebar;

  return (
    <div
      className={clsx({
        [classes.root]: true,
        [classes.shiftContent]: isDesktop,
      })}
    >
      <Suspense fallback={<div />}>
        <Topbar onSidebarOpen={handleSidebarOpen} />
      </Suspense>
      <Suspense fallback={<div />}>
        <Sidebar
          onClose={handleSidebarClose}
          open={shouldOpenSidebar}
          variant={isDesktop ? 'persistent' : 'temporary'}
        />
      </Suspense>
      <Suspense fallback={<LoadingScreen />}>
        <main className={classes.content}>
          {children}
          <Footer />
        </main>
      </Suspense>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
};

export default Main;
