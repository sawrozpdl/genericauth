import React from 'react';

const Account = React.lazy(() => import('./Account'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const NotFound = React.lazy(() => import('./NotFound'));
const AppList = React.lazy(() => import('./AppsList'));
const Settings = React.lazy(() => import('./Settings'));
const SignIn = React.lazy(() => import('./SignIn'));
const SignUp = React.lazy(() => import('./SignUp'));
const UserList = React.lazy(() => import('./UserList'));

export {
  Account,
  Dashboard,
  NotFound,
  AppList,
  Settings,
  SignIn,
  SignUp,
  UserList,
};
