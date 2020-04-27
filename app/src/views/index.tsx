import React from 'react';

const Account = React.lazy(() => import('./Account'));
const Dashboard = React.lazy(() => import('./Dashboard'));
const Icons = React.lazy(() => import('./Icons'));
const NotFound = React.lazy(() => import('./NotFound'));
const ProductList = React.lazy(() => import('./ProductList'));
const Settings = React.lazy(() => import('./Settings'));
const SignIn = React.lazy(() => import('./SignIn'));
const SignUp = React.lazy(() => import('./SignUp'));
const UserList = React.lazy(() => import('./UserList'));

export {
  Account,
  Dashboard,
  Icons,
  NotFound,
  ProductList,
  Settings,
  SignIn,
  SignUp,
  UserList,
};
