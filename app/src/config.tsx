export default {
  env: process.env.NODE_ENV,
  auth: {
    baseUrl: process.env.REACT_APP_AUTH_BASE_URL,
    endpoints: {
      apps: '/apps',
      appHome: '/apps/:appName',
      appUsers: '/apps/:appName/users',
      userProfile: '/apps/:appName/users/:username',
      authorize: '/apps/:appName/authorize',
      logout: '/apps/:appName/logout',
    },
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  },
};
