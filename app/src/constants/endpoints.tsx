import config from '../config';

export const GITHUB_URL = 'https://www.github.com/sawrozpdl/genericauth';

export const APP_CREATE_URL = `${config.app.baseUrl}${config.app.endpoints.createApp}`;

export const LOGIN_URL = `${config.auth.baseUrl}${config.auth.endpoints.login}`;

export const VERIFY_URL = `${config.auth.baseUrl}${config.auth.endpoints.verify}`;

export const FORGOT_PASSWORD_URL = `${config.auth.baseUrl}${config.auth.endpoints.forgotPassword}`;

export const LOGOUT_URL = `${config.auth.baseUrl}${config.auth.endpoints.logout}`;

export const USERS_URL = `${config.auth.baseUrl}${config.auth.endpoints.appUsers}`;

export const AUTHENTICATE_URL = `${config.auth.baseUrl}${config.auth.endpoints.authenticate}`;

export const APPS_URL = `${config.auth.baseUrl}${config.auth.endpoints.apps}`;

export const APP_USERS_URL = `${config.auth.baseUrl}${config.auth.endpoints.appUsers}`;

export const USER_PROFILE_URL = `${config.auth.baseUrl}${config.auth.endpoints.userProfile}`;
