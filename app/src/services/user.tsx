import toast from '../utils/toast';
import { authorizeUser } from '../services/auth';
import http from '../utils/http';
import { USER_PROFILE_URL } from '../constants/endpoints';
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
