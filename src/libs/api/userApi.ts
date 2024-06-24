import { IUserProfileInfo } from '../types';
import { client } from '../utils/fetchClient';
import { getToken } from '../utils/getToken';

export const getInfo = async () => {
  return client.get<IUserProfileInfo>('user-profile', getToken());
};
