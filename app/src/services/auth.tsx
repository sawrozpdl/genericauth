import http from '../utils/http';

import config from '../config';

import * as tokenService from './token';

/**
 * Log out of the system.
 *
 * @param {string} refreshToken
 */
export async function logout(): Promise<void> {
  const url = `${config.auth.baseUrl}${config.auth.endpoints.logout}`;

  url && (await http.get(url));

  tokenService.clear();
}

/**
 * Refresh access token.
 *
 * @param {string} refreshToken
 * @returns {Promise<{accessToken, refreshToken}>}
 */
export async function authorizeUser(refreshToken: string): Promise<any> {
  const url = `${config.auth.baseUrl}${config.auth.endpoints.authorizeUser}`;
  const clientId = config.auth.clientId;

  const { data } = await http.post(url, { refreshToken, clientId });

  return data;
}

/**
 * Refresh access token.
 *
 * @param {string} refreshToken
 * @returns {Promise<{accessToken, refreshToken}>}
 */
export async function refresh(refreshToken: string): Promise<any> {
  const url = `${config.auth.baseUrl}${config.auth.endpoints.refreshToken}`;
  const clientId = config.auth.clientId;

  const { data } = await http.post(url, { refreshToken, clientId });

  return data;
}
