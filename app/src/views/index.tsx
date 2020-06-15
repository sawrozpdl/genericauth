import React from 'react';

const Account = React.lazy(() => import('./Account'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const History = React.lazy(() => import('./History'));
const NotFound = React.lazy(() => import('./NotFound'));
const AppList = React.lazy(() => import('./AppsList'));
const Settings = React.lazy(() => import('./Settings'));
const SignIn = React.lazy(() => import('./SignIn'));
const SignUp = React.lazy(() => import('./SignUp'));
const UserList = React.lazy(() => import('./UserList'));
const CreateApp = React.lazy(() => import('./CreateApp'));
const Policy = React.lazy(() => import('./Policy/Policy'));
const ForgotPassword = React.lazy(() => import('./ForgotPassword'));

export {
  Account,
  Dashboard,
  History,
  NotFound,
  AppList,
  Settings,
  SignIn,
  CreateApp,
  SignUp,
  Policy,
  ForgotPassword,
  UserList,
};
