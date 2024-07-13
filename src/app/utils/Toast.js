import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let defaultConfig = {
  position: 'top-center',
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
};

const success = (message) => {
  toast.success(message, {
    ...defaultConfig,
  });
};

const error = (message) => {
  toast.error(message, {
    ...defaultConfig,
  });
};

const Toast = {
  success,
  error,
};

export default Toast;
