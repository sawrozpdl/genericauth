import HttpStatus from '../constants/HttpStatus';

import * as authService from './auth';
import * as tokenService from './token';
import config from '../config';

import http from '../utils/http';

import httpConstants from '../constants/http';
import errors from '../constants/ErrorMessages';

const BEARER_TAG = httpConstants.BEARER_TAG;
const AUTHORIZATION_HEADER = httpConstants.AUTHORIZATION_HEADER;

/**
 * Build authorization header
 *
 * @param {string} accessToken
 * @returns {string}
 */
const getAuthorizationHeader = (accessToken: string): string => {
  return `${BEARER_TAG} ${accessToken}`;
};

/**
 * Interceptor to add Access Token header for all requests.
 *
 * @param {object} request
 * @returns {object}
 */
export const authorizationInterceptor = (request: any): any => {
  const accessToken = tokenService.getAccessToken();

  if (accessToken && !request.headers[AUTHORIZATION_HEADER]) {
    request.headers[AUTHORIZATION_HEADER] = getAuthorizationHeader(accessToken);
  }

  return request;
};

/**
 * Redirects to the login page.
 *
 * @param {*} error
 */
export function redirectToLogin(): void {
  window.location.href = `${config.auth.baseUrl}${config.auth.endpoints.logout}`;
}

/**
 * Interceptor to refresh Authorization header.
 *
 * @param {object} error
 * @returns {object}
 */
export async function unauthorizedResponseHandlerInterceptor(
  error: any
): Promise<any> {
  if (!error.response) {
    return error;
  }

  const originalRequest = error.config;
  const { code, message } = error.response.data.error;

  // TODO need to fix this
  // also look http.js and auth.js refresh()
  if (code === HttpStatus.UNAUTHORIZED) {
    const refreshToken = tokenService.getRefreshToken();

    try {
      const { accessToken } = await authService.refresh(refreshToken);
      tokenService.setAccessToken(accessToken);
      originalRequest.headers[AUTHORIZATION_HEADER] = getAuthorizationHeader(
        accessToken
      );

      return http.request(originalRequest);
    } catch (e) {
      return redirectToLogin();
    }
  }

  if (
    (code === HttpStatus.UNAUTHORIZED && message === errors.SESSION_EXPIRE) ||
    message === errors.INVALID_REFRESH_TOKEN
  ) {
    await authService.logout();
  }

  return error;
}
