import { StorageKey } from '../types';

export const getToken = () => {
  const token = localStorage.getItem(StorageKey.TOKEN);

  if (!token) {
    window.location.reload();
    return null;
  }

  return token;
};
