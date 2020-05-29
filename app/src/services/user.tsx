import toast from '../utils/toast';
import { authorizeUser } from '../services/auth';
import http from '../utils/http';
import {
  USER_PROFILE_URL,
  DISABLE_USER_URL,
  USER_ROLES_URL,
  CHANGE_PASSWORD_URL,
} from '../constants/endpoints';
import { interpolate } from '../utils/string';

export const fetchUser = async (callback?: any): Promise<any> => {
  let user = null;
  try {
    const activeUser = await authorizeUser();
    if (activeUser) {
      user = activeUser;
    }
  } catch (err) {
    toast.info('Login/Signup via apps section!');
  }
  if (callback) callback(user);
  else return user;
};

export const fetchUserForApp = async (
  username: string,
  appName: string,
  callback?: any
): Promise<any> => {
  const { data } = await http.get(
    interpolate(USER_PROFILE_URL, { username, appName })
  );
  if (callback) callback(data);
  else return data;
};

export const disableUser = async (user: any, hard = false): Promise<void> => {
  const { username, activeApp: appName } = user;
  const toHit = interpolate(hard ? USER_PROFILE_URL : DISABLE_USER_URL, {
    username,
    appName,
  });
  if (hard) await http.delete(toHit);
  else await http.post(toHit);
};

export const promoteUser = async (
  appName: string,
  username: string,
  roleName: string,
  deleteMode = false
): Promise<void> => {
  const toHit = interpolate(USER_ROLES_URL, {
    username,
    appName,
  });
  const config = { params: { roleName } };
  if (deleteMode) await http.delete(toHit, config);
  else await http.post(toHit, config);
};

export const updateUser = async (user: any) => {
  const { username, activeApp: appName } = user;

  await http.put(interpolate(USER_PROFILE_URL, { username, appName }), {
    body: user,
  });
};

export const changePassword = async (password: string) => {
  await http.post(CHANGE_PASSWORD_URL, {
    body: { password },
  });
};
