import React from 'react';
import { Switch, Route } from 'react-router-dom';
import routes from '../constants/routes';

import Home from './home';

interface BaseRouterProps {
  user: object | null;
}

const BaseRouter: React.FC<BaseRouterProps> = (props: BaseRouterProps) => {
  const { user } = props;
  return (
    <Switch>
      <Route
        exact
        path={routes.HOME}
        component={(): any => <Home user={user} />}
      />
      <Route
        exact
        path={routes.APP_HOME}
        component={(): any => <Home user={user} />}
      />
    </Switch>
  );
};

export default BaseRouter;
