import React from 'react';
import Modal from 'react-modal';

import Loader from '../../components/Loader';

import './index.scss';

const PageLoader = ({ pageLoading }) => {
  return (
    <Modal
      isOpen={pageLoading}
      className='Modal'
      overlayClassName='Modal__Overlay'
    >
      <div className='pageloader'>
        <Loader />
      </div>
    </Modal>
  );
};

export default PageLoader;
