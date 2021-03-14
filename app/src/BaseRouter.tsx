import React, { useContext } from 'react';
import { Switch, Redirect } from 'react-router-dom';
import routes from './constants/routes';

import Home from './views/home';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  AppDetail as AppDetailView,
  History as HistoryView,
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
import { interpolate } from './utils/string';

const BaseRouter: React.FC = () => {
  const userCtx: any = useContext(UserContext);
  const { user } = userCtx;
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
        component={AppDetailView}
        exact
        allow={[roles.ADMIN]}
        layout={MainLayout}
        path={routes.MANAGE_APP}
      />
      <RouteWithLayout
        component={HistoryView}
        exact
        allow={[roles.USER]}
        layout={MainLayout}
        path={routes.HISTORY}
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
        component={AccountView}
        exact
        allow={[roles.USER]}
        layout={MainLayout}
        path={routes.ACCOUNT}
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
        allow={[]}
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
        layout={user && user.email ? MainLayout : MinimalLayout}
        path={routes.NOT_FOUND}
      />
      {user && (
        <Redirect
          from={routes.USER_PROFILE}
          to={interpolate(routes.USER_ACCOUNT, { username: user.username })}
        />
      )}
      <Redirect to={routes.NOT_FOUND} />
    </Switch>
  );
};

export default BaseRouter;
