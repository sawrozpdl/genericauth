const routes = {
  HOME: '/',
  APPS: '/apps',
  NOT_FOUND: '/404',
  USERS: '/:appName/users',
  CREATE_APP: '/create',
  APP_HOME: '/:appName',
  LOGIN: '/:appName/login',
  REGISTER: '/:appName/register',
  DASHBOARD: '/:appName/dashboard',
  USER_PROFILE: '/:appName/:username',
  USER_ACCOUNT: '/:appName/:username/account',
  USER_SETTINGS: '/:appName/:username/settings',
  FORGOT_PASSWORD: '/:appName/forgot-password',
};

export default routes;
