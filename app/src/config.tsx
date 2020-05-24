const config: any = {
  env: process.env.NODE_ENV,
  app: {
    baseUrl: process.env.REACT_APP_BASE_URL,
    endpoints: {
      createApp: '/create',
    },
  },
  auth: {
    baseUrl: process.env.REACT_APP_AUTH_BASE_URL,
    endpoints: {
      apps: '/apps',
      verify: '/verify',
      app: '/apps/:appName',
      login: '/apps/:appName/login',
      logout: '/apps/:appName/logout',
      appUsers: '/apps/:appName/users',
      authenticate: '/authenticate',
      forgotPassword: '/forgot-password',
      userProfile: '/apps/:appName/users/:username',
    },
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  },
};

export default config;
