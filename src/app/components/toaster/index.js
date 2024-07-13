import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import { TOAST_TYPE_CONSTANTS } from '../../constants/app-constants';

const Toaster = (props) => {
  const {
    toastType, toastText, closeToast, className, timeout
  } = props;
  setTimeout(() => { closeToast(); }, timeout? timeout: 3000);

  return (
    <>
      <span className={`toaster
      ${toastType === TOAST_TYPE_CONSTANTS.SUCCESS && 'toaster__success'}
      ${toastType === TOAST_TYPE_CONSTANTS.ERROR && 'toaster__error'} ${className}`}
      >
        {toastText}
      </span>
    </>
  );
};

Toaster.propTypes = {
  toastType: PropTypes.string,
  toastText: PropTypes.string.isRequired,
  closeToast: PropTypes.string,
  className: PropTypes.string,
};

Toaster.defaultProps = {
  toastType: '',
  closeToast: '',
  className: '',
};
export default Toaster;
