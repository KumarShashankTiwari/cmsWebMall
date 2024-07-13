import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import MobileOtpLogin from '../container/Login/MobileOtpLogin';

import MallManagement from '../container/MallManagement';
import StoreManagement from '../container/StoreMangement';
import TierManagement from '../container/TierManagement';
import UserManagement from '../container/UserManagement';

import { APP_CONSTANTS, LocalSessionKey } from '../constants/app-constants';
import CreateMall from '../container/MallManagement/CreateMall';
import OfferDeal from '../container/OfferDeal';
import PageNotFound from '../container/PageNotFound';
import CreateStore from '../container/StoreMangement/CreateStore';
import { LocalStorage } from '../utils/storage';
import RoleBasedRoute from './RoleBasedRoute';
import OtpVerification from '../container/Login/OtpVerification';
import MallBanner from '../container/MallBanner';
import CreateMallBanner from '../container/MallBanner/CreateMallBanner';
import CreateMallSupportService from '../container/MallSupportService/CreateMallSupportService';
import MallSupportService from '../container/MallSupportService';
import CustomerManagement from '../container/CustomerManagement';

const CmsRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('admin');
  async function isUserLoggedIn() {
    const accessToken = await LocalStorage.get(LocalSessionKey.ACCESS_TOKEN);
    if (accessToken) {
      return true;
    }
    return false;
  }
  useEffect(() => {
    setIsAuthenticated(isUserLoggedIn);
  }, []);

  return (
    <div className=''>
      <Router>
        <Routes>
          <Route
            element={
              <RoleBasedRoute
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                requiredRole={['admin', 'operation', 'subadmin']}
              />
            }
          >
            <Route
              key={APP_CONSTANTS.USERS_TAG}
              path={APP_CONSTANTS.USERS}
              element={<UserManagement />}
            />
            <Route
              key={APP_CONSTANTS.CUSTOMER_MANAGEMENT_TAG}
              path={APP_CONSTANTS.CUSTOMER_MANAGEMENT}
              element={<CustomerManagement />}
            />
          </Route>

          <Route
            element={
              <RoleBasedRoute
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                requiredRole={['admin', 'operation', 'subadmin']}
              />
            }
          >
            <Route
              key={APP_CONSTANTS.STORE_TAG}
              path={APP_CONSTANTS.STORE}
              element={<StoreManagement />}
            />
          </Route>
          <Route
            element={
              <RoleBasedRoute
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                requiredRole={['admin', 'operation', 'subadmin']}
              />
            }
          >
            <Route
              key={APP_CONSTANTS.STORE_TAG}
              path={APP_CONSTANTS.CREATE_STORE}
              element={<CreateStore />}
            />
            <Route
              key={APP_CONSTANTS.STORE_TAG}
              path={APP_CONSTANTS.EDIT_STORE}
              element={<CreateStore />}
            />
          </Route>
          <Route
            element={
              <RoleBasedRoute
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                requiredRole={['admin', 'operation', 'subadmin']}
              />
            }
          >
            <Route
              key={APP_CONSTANTS.TIER_TAG}
              path={APP_CONSTANTS.TIER}
              element={<TierManagement />}
            />
          </Route>
          <Route
            element={
              <RoleBasedRoute
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                requiredRole={['admin', 'subadmin']}
              />
            }
          >
            <Route
              key={APP_CONSTANTS.MALL_TAG}
              path={APP_CONSTANTS.MALL}
              element={<MallManagement />}
            />
            <Route
              key={APP_CONSTANTS.MALL_TAG}
              path={APP_CONSTANTS.CREATE_MALL}
              element={<CreateMall />}
            />
            <Route
              key={APP_CONSTANTS.MALL_TAG}
              path={APP_CONSTANTS.EDIT_MALL}
              element={<CreateMall />}
            />
            <Route
              key={APP_CONSTANTS.MALL_TAG_BANNER}
              path={APP_CONSTANTS.MALL_BANNER}
              element={<MallBanner />}
            />
            <Route
              key={APP_CONSTANTS.MALL_TAG_BANNER}
              path={APP_CONSTANTS.CREATE_MALL_BANNER}
              element={<CreateMallBanner />}
            />
            <Route
              key={APP_CONSTANTS.MALL_TAG_BANNER}
              path={APP_CONSTANTS.EDIT_MALL_BANNER}
              element={<CreateMallBanner />}
            />
            <Route
              key={APP_CONSTANTS.SUPPORT_SERVICE_TAG}
              path={APP_CONSTANTS.SUPPORT_SERVICE}
              element={<MallSupportService />}
            />
            <Route
              key={APP_CONSTANTS.SUPPORT_SERVICE_TAG}
              path={APP_CONSTANTS.CREATE_SUPPORT_SERVICE}
              element={<CreateMallSupportService />}
            />
            <Route
              key={APP_CONSTANTS.SUPPORT_SERVICE_TAG}
              path={APP_CONSTANTS.CREATE_SUPPORT_SERVICE}
              element={<CreateMallSupportService />}
            />
          </Route>
          <Route
            element={
              <RoleBasedRoute
                isAuthenticated={isAuthenticated}
                userRole={userRole}
                requiredRole={['admin', 'subadmin']}
              />
            }
          >
            <Route
              key={APP_CONSTANTS.OFFER_DEALS_TAG}
              path={APP_CONSTANTS.OFFER_DEALS}
              element={<OfferDeal />}
            />
          </Route>
          <Route path='/otpscreen' element={<OtpVerification />} />
          <Route path='/' element={<MobileOtpLogin />} />
          <Route path='*' element={<PageNotFound />} />
          <Route
            path='/malla-SupportService'
            element={<CreateMallSupportService />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default CmsRoutes;
