import React, { useEffect } from 'react';
// Containers
import Header from '../header';
import Sidebar from '../Sidebar/index';

// Components
// import CmsPreview from 'pages/ArticleDetailPage/CmsPreview';

// utils
import { LocalStorage } from '../../utils/storage';

// Constants
import { LocalSessionKey } from '../../constants/app-constants';
import { APP_CONSTANTS } from '../../constants/app-constants';

// Images
import { CloseBlackIcon } from '../../constants/image-constants';

import './index.scss';

const BasePage = ({ children }) => {
  // useEffect(() => {
  //   const versionNo = LocalStorage.get(
  //     LocalSessionKey.VERSION ? LocalSessionKey.VERSION : {}
  //   );
  //   const appVersion = JSON.parse(
  //     process.env.REACT_APP_APP_VERSION ? process.env.REACT_APP_APP_VERSION : {}
  //   );

  //   if (!versionNo) {
  //     LocalStorage.set(
  //       LocalSessionKey.VERSION,
  //       process.env.REACT_APP_APP_VERSION
  //     );
  //   }

  //   if (versionNo && JSON.parse(versionNo) !== appVersion) {
  //     LocalStorage.clear();
  //     LocalStorage.set(
  //       LocalSessionKey.VERSION,
  //       process.env.REACT_APP_APP_VERSION
  //     );
  //     window.location.href = APP_CONSTANTS.LOGIN;
  //   }
  // }, []);

  return (
    <div>
      <Header />
      <div className='flexWrapper'>
        <Sidebar />

        <div className='contentWrapper'>{children}</div>
      </div>
    </div>
  );
};

export default BasePage;
