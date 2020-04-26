export default {
  env: process.env.NODE_ENV,
  auth: {
    baseUrl: process.env.REACT_APP_AUTH_BASE_URL,
    endpoints: {
      refreshToken: '/refresh',
      logout: '/logout',
      authorizeUser: '/users/authorize',
    },
    clientId: process.env.REACT_APP_AUTH_CLIENT_ID,
  },
};
