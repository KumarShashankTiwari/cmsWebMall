import { RegexValidations } from 'constants/app-constants';

export function Title(value) {}

export function NumberValidation(value) {
  value = value.trim();
  const reg = /^[0-9]+$/;
  if (!value) return false;
  return reg.test(value);
}

export function MobileNumberValidation(value) {
  const re = /^[7-9][0-9]{9}$/;
  return re.test(value);
}

export function OtpValidation(value) {
  const re = /^[0-9]{0,6}$/;
  return re.test(value);
}

export function NameValidation(value) {
  const re = /^[A-Za-z\s.]+$/;
  return re.test(value);
}

export function EmailValidation(data) {
  data = data.trim();
  const re = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  // const re = /^[a-zA-Z0-9]+@+[a-zA-Z0-9]+.+[A-z]$/;
  return re.test(data);
}

export const isEmailValid = (value) => {
  const emailRegex = RegexValidations.EMAIL;
  if (value === null) return false;
  return emailRegex.test(String(value).toLowerCase());
};

export const validateUrl = (value) => {
  const urlRegex =
    /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

  if (value === null) return false;
  return urlRegex.test(value);
};

const Validation = {
  isEmailValid,
};

export default Validation;
