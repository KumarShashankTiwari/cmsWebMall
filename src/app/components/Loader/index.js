import React from 'react';

// Components
import BeatLoaderComponent from '../../components/Loaders/BeatLoader';

import './index.scss';

const Loader = () => {
  return (
    <div className='page-loader'>
      <BeatLoaderComponent />
    </div>
  );
};

export default Loader;
