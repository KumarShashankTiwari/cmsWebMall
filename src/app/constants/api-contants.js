export const BaseURL = {
  BASE_URL: `${process.env.REACT_APP_AUTH_BASE_URL}/api/v1/`,
};

export const API_CONSTANTS = {
  GET_OTP: `${BaseURL.BASE_URL}admin/user/send-otp`,
  VERIFY_OTP: `${BaseURL.BASE_URL}admin/user/verify-otp`,
  RESEND_OTP: `${BaseURL.BASE_URL}admin/user/send-otp?type=resend`,
  LOGOUT: `${BaseURL.BASE_URL}admin/user/logout`,
  REFRESH_TOKEN: `${BaseURL.BASE_URL}v1/refresh_token`,
  GET_USER: `${BaseURL.BASE_URL}admin/user`,
  MALL: `${BaseURL.BASE_URL}admin/mall`,
  STORE: `${BaseURL.BASE_URL}admin/stores`,
  CATEGORY: `${BaseURL.BASE_URL}app/category-list`,
  MEDIA_UPLOAD: `${BaseURL.BASE_URL}file/upload`,
  CREATE_MALL_BANNER: `${BaseURL.BASE_URL}admin/file`,
  EMINITIES: `${BaseURL.BASE_URL}/emities`,
  SUPPORT_DETAIL: `${BaseURL.BASE_URL}admin/supportDetail`,
};
