import React from 'react';
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
const BaseRouter: React.FC = (props) => {
  return (
    <Switch>
      <RouteWithLayout
        layout={MinimalLayout}
        exact
        path={routes.HOME}
        component={(): any => <Home />}
      />
      <RouteWithLayout
        component={DashboardView}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={UserListView}
        exact
        layout={MainLayout}
        path="/users"
      />
      <RouteWithLayout
        component={AppListView}
        exact
        layout={MinimalLayout}
        path="/apps"
      />
      <RouteWithLayout
        component={AccountView}
        exact
        layout={MainLayout}
        path="/account"
      />
      <RouteWithLayout
        component={SettingsView}
        exact
        layout={MainLayout}
        path="/settings"
      />
      <RouteWithLayout
        component={CreateAppView}
        exact
        layout={MinimalLayout}
        path="/create-app"
      />
      <RouteWithLayout
        component={SignUpView}
        exact
        layout={MinimalLayout}
        path="/sign-up"
      />
      <RouteWithLayout
        component={SignInView}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={ForgotPasswordView}
        exact
        layout={MinimalLayout}
        path="/forgot-password"
      />
      <RouteWithLayout
        component={NotFoundView}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default BaseRouter;
