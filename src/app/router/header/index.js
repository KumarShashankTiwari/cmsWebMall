import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import AltTag from '../../constants/alt-tag';
import { APP_CONSTANTS, LocalSessionKey } from '../../constants/app-constants';
import AppLogoImage from '../../../assets/images/pacificlogo.svg';
import Group from '../../../assets/images/Group.svg';
import Open from '../../../assets/images/ic-chevron-down.png';
import LogoutImage from '../../../assets/images/logout.png';
import { logoutAction } from '../../api/onboarding';
import { LocalStorage } from '../../utils/storage';
import './index.scss';

const Header = () => {
  const [isLogoutVisible, setIsLogoutVisible] = useState(false);

  const toggleLogoutVisibility = () => {
    setIsLogoutVisible(!isLogoutVisible);
  };

  const handleLogOut = async () => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to sign out?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            sureLogout();
          },
        },
        {
          label: 'No',
        },
      ],
    });
  };

  async function sureLogout() {
    await LocalStorage.clear();
    window.location.href = APP_CONSTANTS.LOGIN;
    return;
    let responseObj = await logoutAction();
    if (responseObj.responseCode === 200) {
      LocalStorage.clear();
      window.location.href = APP_CONSTANTS.LOGIN;
    }
  }
  const [user, setUser] = useState({});
  async function isUserInfo() {
    const user = await LocalStorage.get(LocalSessionKey.USER_INFO);
    const val = JSON.parse(user);

    setUser({ ...val });
  }

  useEffect(() => {
    isUserInfo();
  }, []);
  const navigate = useNavigate();

  const getUserInitials = (name) => {
    const nameParts = name.split(' ');
    if (nameParts.length > 1) {
      return `${nameParts[0].charAt(0)}${nameParts[1].charAt(0)}`.toUpperCase();
    }
    return name.charAt(0).toUpperCase();
  };

  const userInitials = useMemo(() => {
    if (user && user.name) {
      return getUserInitials(user.name);
    }
    return '';
  }, [user?.name]);

  return (
    <div className='header'>
      <div className='header__left'>
        <img
          className='header__logo'
          alt={AltTag.AppLogo}
          src={AppLogoImage}
          onClick={() => navigate('/')}
        />
        <img
          className='header__head_image'
          alt={AltTag.AppLogo}
          src={Group}
          onClick={() => navigate('/')}
        />
      </div>
      <div className='header__right'>
        <div className='header__profile' onClick={toggleLogoutVisibility}>
          <span className='header__profile-name'>
            <span className='header__profile-name__initials'>
              {userInitials}
            </span>
            {user?.name}
            <img src={Open} alt='open' />
          </span>
          {isLogoutVisible && (
            <span className='header__logout' onClick={handleLogOut}>
              <img src={LogoutImage} alt='Logout' />
              <span className='signout'>Sign Out</span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
