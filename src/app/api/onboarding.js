import { API_CONSTANTS } from '../constants/api-contants';
import * as dataAccess from '../utils/ajax';
import ApiParser from '../utils/ApiParser';

export const sendOtpApi = async (data) => {
  let payload = {
    data: data,
  };
  let responseObj = await dataAccess.post(API_CONSTANTS.GET_OTP, payload);
  return responseObj;
};

export const sendOtpVerify = async (data) => {
  let payload = {
    data: data,
  };
  let responseObj = await dataAccess.put(API_CONSTANTS.VERIFY_OTP, payload);
  return responseObj;
};

export const resendOtp = async (data) => {
  let payload = {
    data: data,
  };
  let responseObj = await dataAccess.post(API_CONSTANTS.RESEND_OTP, payload);
  return responseObj;
};

export const logoutAction = async () => {
  let responseObj = await dataAccess.get(API_CONSTANTS.LOGOUT);
  return responseObj;
};
