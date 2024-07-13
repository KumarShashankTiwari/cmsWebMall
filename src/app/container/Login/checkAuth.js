import { LocalSessionKey } from '../../constants/app-constants';
import { LocalStorage } from '../../utils/storage';

export const checkAuth = () => {
  return new Promise((resolve, reject) => {
    const accessToken = LocalStorage.get(LocalSessionKey?.ACCESS_TOKEN); // assuming LocalSessionKey?.ACCESS_TOKEN is 'ACCESS_TOKEN'
    if (accessToken) {
      resolve(accessToken);
    } else {
      reject('No access token found');
    }
  });
};
