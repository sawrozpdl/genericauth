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
      appPrivacy: '/apps/:appName/privacy',
      appLocation: '/apps/:appName/location',
      appRedirectUrl: '/apps/:appName/redirect-url',
      login: '/apps/:appName/login',
      logout: '/apps/:appName/users/:username/logout',
      appUsers: '/apps/:appName/users',
      authenticate: '/authenticate',
      changePassword: '/change-password',
      userProfile: '/apps/:appName/users/:username',
      userRoles: '/apps/:appName/users/:username/roles',
      disableUser: '/apps/:appName/users/:username/disable',
    },
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  },
};

export default config;
