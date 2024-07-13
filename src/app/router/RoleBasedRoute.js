// RoleBasedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import BasePage from './BasePage';

const RoleBasedRoute = ({ isAuthenticated, userRole, requiredRole }) => {
  return isAuthenticated && requiredRole.includes(userRole) ? (
    <BasePage>
      <Outlet />
    </BasePage>
  ) : (
    <Navigate to='/' />
  );
};

export default RoleBasedRoute;
