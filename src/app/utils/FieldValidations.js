import Messages from 'constants/messages';
import Validation from 'helpers/validation';

export const validateEmail = (value, isRequired = true) => {
  if (value.length === 0) {
    if (isRequired) {
      return {
        isError: true,
        message: Messages.EMAIL_REQUIRED,
      };
    }
    return {
      isError: false,
    };
  }

  if (value.length && !Validation.isEmailValid(value)) {
    return {
      isError: true,
      message: Messages.INVALID_EMAIL,
    };
  }
  return { isError: false };
};
