import config from '../config';

export const GITHUB_URL = 'https://www.github.com/sawrozpdl/genericauth';

export const LOGIN_URL = `${config.auth.baseUrl}${config.auth.endpoints.login}`;

export const LOGOUT_URL = `${config.auth.baseUrl}${config.auth.endpoints.logout}`;

export const USERS_URL = `${config.auth.baseUrl}${config.auth.endpoints.appUsers}`;

export const AUTHENTICATE_URL = `${config.auth.baseUrl}${config.auth.endpoints.authenticate}`;

export const APPS_URL = `${config.auth.baseUrl}${config.auth.endpoints.apps}`;
