import React from 'react';
import { useNavigate } from 'react-router';

// Image
import back from '../../../assets/images/back.png';

import './index.scss';

const HeaderWithBackButton = ({ title, goTo, canGoBack, onBackClicked }) => {
  const navigate = useNavigate();

  const onClick = () => {
    if (canGoBack === true) {
      navigate.goBack();
      return;
    }

    if (goTo) {
      navigate(goTo);
      return;
    }
    onBackClicked && onBackClicked();
  };

  return (
    <div className='headerback'>
      <img
        className='headerback_backicon'
        src={back}
        alt='Go back'
        width='25'
        height='25'
        onClick={onClick}
      />
      <div className='headerback_title'>{title}</div>
    </div>
  );
};

export default HeaderWithBackButton;
