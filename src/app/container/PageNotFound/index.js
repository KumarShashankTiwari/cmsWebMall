import React from 'react';
import { APP_CONSTANTS } from '../../constants/app-constants';
import './index.scss';

const PageNotFound = () => {
  return (
    <div className='pnf'>
      <h1>Page Not Found</h1>
      <h2>We can't find that page</h2>
      <p>
        The requested URL was not found on this server.
        <a href={APP_CONSTANTS.NEWSFEED}>Go to Home</a>
      </p>
    </div>
  );
};

export default PageNotFound;
