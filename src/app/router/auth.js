// utils/auth.js
import { APP_CONSTANTS, LocalSessionKey } from '../constants/app-constants';
import { handleDecodeValues } from '../utils/Parsers';
import { LocalStorage } from '../utils/storage';
import SideMenuData from './Sidebar/SideMenuData';

export const isUserLoggedIn = () => {
  const EncodedData = localStorage.getItem('EncodedValues');
  const accessToken = LocalStorage.get(LocalSessionKey.ACCESS_TOKEN);
  return accessToken && EncodedData;
};

export const handlePushRoute = () => {
  const initialValue = handleDecodeValues(); // Ensure handleDecodeValues() is implemented correctly
  let pathname;

  if (initialValue) {
    const feedData = SideMenuData.filter((val) =>
      initialValue.includes(val.key)
    );
    pathname = feedData.length > 0 ? feedData[0].to : APP_CONSTANTS.LOGIN;
  } else {
    pathname = APP_CONSTANTS.LOGIN;
  }
  return pathname;
};
