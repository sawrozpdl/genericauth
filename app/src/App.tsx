import React, { useEffect, useContext } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Router, Switch } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import validate from 'validate.js';
import { checked } from './utils/object';

import { createTheme } from './theme/create';

import { createBrowserHistory } from 'history';
import BaseRouter from './BaseRouter';
import UserContext from './context/UserContext';
import useSettings from './hooks/useSettings';
import { fetchUser } from './services/user';

const browserHistory = createBrowserHistory();

const App: React.FC = (props: any) => {
  const userCtx: any = useContext(UserContext);
  const { setUser } = userCtx;

  useEffect(() => {
    fetchUser(setUser);
    // eslint-disable-next-line
  }, []);

  const useStyles = makeStyles((theme: any) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    },
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
    },
  }));

  const classes = useStyles();

  validate.validators = {
    ...validate.validators,
    checked,
  };
  const { settings } = useSettings();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={createTheme(settings)}>
        <Router history={browserHistory}>
          <CssBaseline />
          <Switch>
            <BaseRouter />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
