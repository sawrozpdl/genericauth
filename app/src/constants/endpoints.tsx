import config from '../config';

export const GITHUB_URL = '#';

export const APP_CREATE_URL = `${config.app.baseUrl}${config.app.endpoints.createApp}`;

export const LOGIN_URL = `${config.auth.baseUrl}${config.auth.endpoints.login}`;

export const VERIFY_URL = `${config.auth.baseUrl}${config.auth.endpoints.verify}`;

export const CHANGE_PASSWORD_URL = `${config.auth.baseUrl}${config.auth.endpoints.changePassword}`;

export const LOGOUT_URL = `${config.auth.baseUrl}${config.auth.endpoints.logout}`;

export const USERS_URL = `${config.auth.baseUrl}${config.auth.endpoints.appUsers}`;

export const USER_ROLES_URL = `${config.auth.baseUrl}${config.auth.endpoints.userRoles}`;

export const AUTHENTICATE_URL = `${config.auth.baseUrl}${config.auth.endpoints.authenticate}`;

export const APPS_URL = `${config.auth.baseUrl}${config.auth.endpoints.apps}`;

export const APP_URL = `${config.auth.baseUrl}${config.auth.endpoints.app}`;

export const APP_PRIVACY_URL = `${config.auth.baseUrl}${config.auth.endpoints.appPrivacy}`;

export const APP_LOCATION_URL = `${config.auth.baseUrl}${config.auth.endpoints.appLocation}`;

export const APP_REDIRECT_URL_URL = `${config.auth.baseUrl}${config.auth.endpoints.appRedirectUrl}`;

export const APP_USERS_URL = `${config.auth.baseUrl}${config.auth.endpoints.appUsers}`;

export const USER_PROFILE_URL = `${config.auth.baseUrl}${config.auth.endpoints.userProfile}`;

export const PROFILE_URL = `${config.auth.baseUrl}${config.auth.endpoints.profile}`;

export const DISABLE_USER_URL = `${config.auth.baseUrl}${config.auth.endpoints.disableUser}`;

export const IMAGE_UPLOADER_URL = `${config.lambda.imageUploader}`;
