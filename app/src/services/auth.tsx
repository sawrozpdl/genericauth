import http from '../utils/http';

import { AUTHENTICATE_URL } from '../constants/endpoints';

import * as tokenService from './token';

/**
 * Log out of the system.
 *
 * @param {string} refreshToken
 */
export async function logout(): Promise<void> {
  // await http.post(LOGOUT_URL); TODO: track lastLogin

  tokenService.clear();
}

/**
 * Refresh access token.
 *
 * @returns {Promise<{accessToken, refreshToken}>}
 */
export async function authorizeUser(): Promise<any> {
  const { data } = await http.post(AUTHENTICATE_URL);

  return data;
}

/**
 * Refresh access token.
 *
 * @param {string} refreshToken
 * @returns {Promise<{accessToken, refreshToken}>}
 */
export async function refresh(refreshToken: string): Promise<any> {
  const { data } = await http.post(AUTHENTICATE_URL, {
    headers: { Authorization: `Refresh ${refreshToken}` },
  });

  return data;
}
