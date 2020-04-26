import React, { Fragment, Suspense, useState, useEffect } from 'react';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import * as storage from './utils/storage';
import httpConstants from './constants/http';

import { handleError } from './utils/error';

import { authorizeUser } from './services/auth';

import routes from './constants/routes';

import Main from './components/main';

import useStyles from './styles/useStyles';

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

  return (
    <div className={classes.root}>
      <BrowserRouter>
        <CssBaseline />
        <Suspense fallback={<Fragment />}>
          <Switch>
            <Route
              exact
              path={routes.HOME}
              component={(): any => <Main user={user} />}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
