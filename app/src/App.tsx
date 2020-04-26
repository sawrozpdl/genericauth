import React, { Fragment, Suspense, useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';

import * as storage from './utils/storage';
import httpConstants from './constants/http';

import { handleError } from './utils/error';

import { authorizeUser } from './services/auth';
// import Chart from 'react-chartjs-2';
// import { chartjs } from './helpers';
import validate from 'validate.js';

import routes from './constants/routes';
import validators from './common/validators';

import Main from './components/main';
import theme from './theme';
import { createBrowserHistory } from 'history';

import useStyles from './styles/useStyles';

const browserHistory = createBrowserHistory();

// Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
//   draw: chartjs.draw,
// });

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

  useEffect(() => {
    const userResponse = getActiveUser();
    const { data } = userResponse;

    setUser(data);
  }, []);

  const classes = useStyles();

  validate.validators = {
    ...validate.validators,
    ...validators,
  };

  return (
    <div className={classes.root}>
      <ThemeProvider theme={theme}>
        <Router history={browserHistory}>
          <CssBaseline />
          <Suspense fallback={<Fragment />}>
            <Switch>
              <Main user={user} />
            </Switch>
          </Suspense>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
