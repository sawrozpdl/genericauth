import React, { useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Router, Switch } from 'react-router-dom';
import { ThemeProvider, makeStyles } from '@material-ui/styles';

import { authorizeUser } from './services/auth';
import validate from 'validate.js';
import roles from './constants/roles';
import validators from './common/validators';

import { createTheme } from './theme/create';

import { createBrowserHistory } from 'history';
import BaseRouter from './BaseRouter';
import UserContext from './context/UserContext';
import useSettings from './hooks/useSettings';
import toast from './utils/toast';

const browserHistory = createBrowserHistory();

const App: React.FC = () => {
  const [user, setUser] = useState(null);

  const getGuestUser = (): any => {
    return {
      id: -1,
      firstName: 'Anon',
      activeRoles: [roles.GUEST],
    };
  };

  const fetchUser = async (): Promise<any> => {
    let user = getGuestUser();
    try {
      const activeUser = await authorizeUser();
      if (activeUser) {
        user = activeUser;
      }
    } catch (err) {
      toast.info('Login/Signup via apps section!');
    }
    setUser(user);
  };

  useEffect(() => {
    fetchUser();
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
