/* eslint-disable no-undef */
import axios from 'axios';

import HttpStatus from '../constants/HttpStatus';

import config from '../config';

import * as authService from '../services/auth';
import * as tokenService from '../services/token';

const instance = axios.create({
  baseURL: config.baseURI,
  headers: {
    'Content-Type': 'application/json',
  },
});

let unauthorizedRequestQueue: any[] = [];
let isRefreshingAccessToken = false;

/**
 * Changes access token of the provided request.
 *
 * @param {Object} originalRequest
 * @param {Object} newToken
 */
function changeAccessToken(originalRequest: any, newToken: any) {
  return {
    ...originalRequest,
    headers: {
      ...originalRequest.headers,
      Authorization: `Bearer ${newToken}`,
    },
  };
}

/**
 * Subscribe retry request to access token refresh.
 * Add request to unauthorized request queue.
 *
 * @param {Function} callback
 */
function subscribeToAccessTokenRefresh(callback: any) {
  unauthorizedRequestQueue.push(callback);
}

/**
 * Calls pending requests from unauthorized request queue.
 *
 * @param {String} refreshedAccessToken
 */
function callRequestsFromUnauthorizedQueue(refreshedAccessToken: any) {
  unauthorizedRequestQueue.map((cb) => cb(refreshedAccessToken));
}

/**
 * Clears unauthorized request queue.
 */
function clearUnauthorizedRequestQueue() {
  unauthorizedRequestQueue = [];
}

/**
 * Clear tokens and redirect to login page.
 */
async function clearLocalAuth() {
  await authService.logout();
}

async function errorResponseHandler(err: any) {
  const originalRequest = err.config;
  const code = err.response && err.response.status;
  if (originalRequest.headers.Authorization.split(' ')[0] === 'Refresh') {
    await clearLocalAuth();
  } else if (code === HttpStatus.UNAUTHORIZED) {
    originalRequest.params.__isRetryRequest = true;
    try {
      const refreshToken = tokenService.getRefreshToken();
      if (!refreshToken) {
        clearLocalAuth();
      } else if (!isRefreshingAccessToken) {
        isRefreshingAccessToken = true;
        const { accessToken } = await authService.refresh(refreshToken);
        tokenService.setAccessToken(accessToken);
        const newRequest = changeAccessToken(originalRequest, accessToken);

        callRequestsFromUnauthorizedQueue(accessToken);

        clearUnauthorizedRequestQueue();

        isRefreshingAccessToken = false;
        return instance.request(newRequest);
      } else {
        const retryRequest = new Promise((resolve) => {
          subscribeToAccessTokenRefresh(function (refreshedAccessToken: any) {
            const newRequest = changeAccessToken(
              originalRequest,
              refreshedAccessToken
            );

            resolve(instance.request(newRequest));
          });
        });

        return retryRequest;
      }
    } catch (error) {
      await clearLocalAuth();
    }
  }

  return Promise.reject(err);
}

/**
 * @param {String} url The url for the api request (without the base).
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url.
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header.
 * @returns {Promise}
 */
const get = (
  url: any,
  { params = {}, accessToken = true, headers = {} } = {}
): any => {
  const authHeaders: any = {};

  if (accessToken) {
    authHeaders['Authorization'] = `Bearer ${tokenService.getAccessToken()}`;
  }

  return instance({
    url,
    params,
    method: 'get',
    headers: { ...authHeaders, ...headers },
  });
};

/**
 * @param {String} url The url for the api request (without the base).
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url.
 * @param {Object} [config.body] An object that will be sent in the request
 * body.
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header.
 * @returns {Promise}
 */
const post = (
  url: any,
  { params = {}, body = {}, accessToken = true, headers = {} } = {}
) => {
  const authHeaders: any = {};

  if (accessToken) {
    authHeaders['Authorization'] = `Bearer ${tokenService.getAccessToken()}`;
  }
  return instance({
    url,
    params,
    data: body,
    method: 'post',
    headers: { ...authHeaders, ...headers },
  });
};

/**
 * @param {String} url The url for the api request (without the base).
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url.
 * @param {Object} [config.body] An object that will be sent in the request
 * body.
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header.
 * @returns {Promise}
 */
const put = (
  url: any,
  { params = {}, body = {}, accessToken = true, headers = {} } = {}
) => {
  const authHeaders: any = {};

  if (accessToken) {
    authHeaders['Authorization'] = `Bearer ${tokenService.getAccessToken()}`;
  }

  return instance({
    url,
    params,
    data: body,
    method: 'put',
    headers: { ...authHeaders, ...headers },
  });
};

/**
 * @param {String} url The url for the api request (without the base).
 * @param {Object} [config]
 * @param {Object} [config.params] An object of queries that will be added to
 * the url.
 * @param {Boolean} [config.accessToken] Whether or not to include the
 * access-token header.
 * @returns {Promise}
 */
const remove = (
  url: any,
  { params = {}, accessToken = true, headers = {} } = {}
) => {
  const authHeaders: any = {};

  if (accessToken) {
    authHeaders['Authorization'] = `Bearer ${tokenService.getAccessToken()}`;
  }

  return instance({
    url,
    params,
    method: 'delete',
    headers: { ...authHeaders, ...headers },
  });
};

/**
 * Initialize the unauthorized response interceptors.
 */
instance.interceptors.response.use(
  (response) => response,
  errorResponseHandler
);

const http = {
  ...instance,
  get,
  put,
  post,
  delete: remove,
};

export default http;
