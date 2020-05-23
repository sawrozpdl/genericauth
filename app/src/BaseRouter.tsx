import React, { useContext } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import routes from './constants/routes';

import Home from './views/home';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  AppList as AppListView,
  UserList as UserListView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  ForgotPassword as ForgotPasswordView,
  NotFound as NotFoundView,
  CreateApp as CreateAppView,
} from './views';
import UserContext from './context/UserContext';
import roles from './constants/roles';

const BaseRouter: React.FC = () => {
  const user: any = useContext(UserContext);
  return (
    <Switch>
      <RouteWithLayout
        layout={MinimalLayout}
        allow={[roles.GUEST]}
        exact
        path={routes.HOME}
        component={Home}
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        allow={[roles.ADMIN]}
        layout={MainLayout}
        path={routes.DASHBOARD}
      />
      <RouteWithLayout
        component={UserListView}
        exact
        allow={[roles.USER]}
        layout={MainLayout}
        path={routes.USERS}
      />
      <RouteWithLayout
        component={AppListView}
        exact
        allow={[]}
        layout={user && user.email ? MainLayout : MinimalLayout}
        path={routes.APPS}
      />
      <RouteWithLayout
        component={AccountView}
        exact
        allow={[roles.USER]}
        layout={MainLayout}
        path={routes.USER_ACCOUNT}
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        allow={[roles.USER]}
        layout={MainLayout}
        path={routes.USER_SETTINGS}
      />
      <RouteWithLayout
        component={CreateAppView}
        exact
        allow={[roles.USER]}
        layout={MinimalLayout}
        path={routes.CREATE_APP}
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        allow={[roles.GUEST]}
        layout={MinimalLayout}
        path={routes.REGISTER}
      />
      <RouteWithLayout
        component={SignInView}
        exact
        allow={[roles.GUEST]}
        layout={MinimalLayout}
        path={routes.LOGIN}
      />
      <RouteWithLayout
        component={ForgotPasswordView}
        exact
        allow={[roles.GUEST]}
        layout={MinimalLayout}
        path={routes.FORGOT_PASSWORD}
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        allow={[]}
        layout={MinimalLayout}
        path={routes.NOT_FOUND}
      />
      <Redirect to={routes.NOT_FOUND} />
    </Switch>
  );
};

export default BaseRouter;
