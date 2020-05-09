import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Router, Switch } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import * as storage from './utils/storage';
import httpConstants from './constants/http';

import { handleError } from './utils/error';

import { authorizeUser } from './services/auth';
import validate from 'validate.js';
import roles from './constants/roles';
import validators from './common/validators';

import { createTheme } from './theme/create';

import { createBrowserHistory } from 'history';
import BaseRouter from './BaseRouter';
import UserContext from './UserContext';
import useSettings from './hooks/useSettings';

const browserHistory = createBrowserHistory();

const App: React.FC = () => {
  const [user, setUser] = useState(null);

  const getActiveUser = (): any => {
    try {
      const accessToken = storage.get(httpConstants.ACCESS_TOKEN);

      return authorizeUser(accessToken);
    } catch (err) {
      handleError(err);
    }

    return null;
  };

  const getGuestUser = () => {
    return {
      id: -1,
      firstName: 'Anon',
      roles: [roles.GUEST],
    };
  };

  useEffect(() => {
    const userResponse = getActiveUser();
    let { data } = userResponse;
    data = data ? data : getGuestUser();
    setUser(data);
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
    ...validators,
  };
  const { settings } = useSettings();
  return (
    <div className={classes.root}>
      <ThemeProvider theme={createTheme(settings)}>
        <Router history={browserHistory}>
          <CssBaseline />
          <Switch>
            <UserContext.Provider value={user}>
              <BaseRouter />
            </UserContext.Provider>
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
