export default {
  env: process.env.NODE_ENV,
  auth: {
    baseUrl: process.env.REACT_APP_AUTH_BASE_URL,
    endpoints: {
      apps: '/apps',
      verify: '/verify',
      appHome: '/apps/:appName',
      logout: '/apps/:appName/logout',
      appUsers: '/apps/:appName/users',
      forgotPassword: '/forgot-password',
      authorize: '/apps/:appName/authorize',
      appLocation: '/apps/:appName/location',
      userProfile: '/apps/:appName/users/:username',
      userRole: '/apps/:appName/users/:username/roles',
      userLocation: '/apps/:appName/users/:username/location',
    },
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  },
};
