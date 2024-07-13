export const APP_CONSTANTS = {
  LOGIN: '/',
  USERS: '/users',
  CREATE_USER: '/user/create',
  EDIT_USER: '/user/edit/:id',

  STORE: '/store',
  CREATE_STORE: '/store/create',
  EDIT_STORE: '/store/edit/:id',

  VOUCHER: '/voucher',
  CREATE_VOUCHER: '/voucher/create',
  EDIT_VOUCHER: '/voucher/edit/:id',

  OFFER_DEALS: '/offer-deals',
  CREATE_OFFER_DEALS: '/offer-deals/create',
  EDIT_OFFER_DEALS: '/offer-deals/edit/:id',

  TIER: '/tier',
  CREATE_TIER: '/tier/create',
  EDIT_TIER: '/tier/edit/:id',

  BILL_VALIDATION: '/bill-validation',
  CREATE_BILL_VALIDATION: '/bill-validation/create',
  EDIT_BILL_VALIDATION: '/bill-validation/edit/:id',

  CUSTOMER_MANAGEMENT: '/customer-management',
  CREATE_CUSTOMER_MANAGEMENT: '/customer-management/create',
  EDIT_CUSTOMER_MANAGEMENT: '/customer-management/edit/:id',

  ANALYTICS: '/analytics',
  CREATE_ANALYTICS: '/analytics/create',
  EDIT_ANALYTICS: '/analytics/edit/:id',

  MALL: '/mall',
  CREATE_MALL: '/mall/create',
  EDIT_MALL: '/mall/edit/:id',

  MALL_BANNER: '/mall-banner',
  CREATE_MALL_BANNER: '/mall-banner/create',
  EDIT_MALL_BANNER: '/mall-banner/edit/:id',

  MALL_BRAND_BANNER: '/mall-brand-banner',
  CREATE_MALL_BRAND_BANNER: '/mall-brand-banner/create',
  EDIT_MALL_BRAND_BANNER: '/mall-brand-banner/edit/:id',

  SUPPORT_SERVICE: '/mall-support-service',
  CREATE_SUPPORT_SERVICE: '/mall-support-service/create',
  EDIT_SUPPORT_SERVICE: '/mall-support-service/edit/:id',

  MALL_TAG: 'MALL',
  MALL_BANNER_TAG: 'MALL BANNER',
  MALL_BRAND_BANNER_TAG: 'MALL BRAND BANNER',

  CREATE_MALL_TAG: 'Add Mall',
  CREATE_MALL_BANNER_TAG: 'Add Banner',

  CREATE_SUPPORT_SERVICE_TAG: 'Add Service',
  SUPPORT_SERVICE_TAG: 'Mall Eminities',

  REWARDS_TAG: 'REWARDS',
  VOUCHER_TAG: 'VOUCHER',
  TIER_TAG: 'TIER',
  STORE_TAG: 'STORE',

  OFFER_DEALS_TAG: 'OFFER',
  USERS_TAG: 'USER',
  BILL_VALIDATION_TAG: 'BILL VALIDATION',
  CUSTOMER_MANAGEMENT_TAG: 'CUSTOMER MANAGEMENT',
  ANALYTICS_TAG: 'ANALYTICS',

  CREATE_STORE_TAG: 'Add Store',
  CREATE_USER_TAG: 'Add User',
  CREATE_VOUCHER_TAG: 'Add Voucher',
};

export const FILE_TYPES_CONSTANTS = {
  VIDEO: 'video',
  IMAGE: 'image',
  IMAGE_JPEG: 'image/jpeg',
  AUDIO: 'audio',
};

export const TOAST_TYPE_CONSTANTS = {
  SUCCESS: 'success',
  ERROR: 'error',
  PRIVATE: 'private',
  RESTRICTED: 'restricted',
  OPEN: 'open',
};

export const USER_ROLE_CONSTANTS = {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
  SUPER_ADMIN: 'SUPER_ADMIN',
};

export const PROFILE_TYPE_CONSTANTS = {
  PROFILE: 'PROFILE',
};

export const LocalSessionKey = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
  FINGERPRINT: 'fingerprint',
  FEED_ID: 'feedId',
  BREATEFREE_ID: 'breathefreeId',
  PERMISSSION_TAG: 'permissiontag',
  VERSION: 'ver',
  USER_INFO: 'userInfo',
};

export const EventType = {
  EDIT: 'EDIT',
  DELETE: 'DELETE',
  PUBLISH_UNPUBLISH: 'PUBLISH_UNPUBLISH',
};

export const URLType = {
  EXTERNAL: 'EXTERNAL',
  EXTERNAL_PWA: 'EXTERNAL_PWA',
  INTERNAL: 'INTERNAL',
  INTERNAL_PWA: 'INTERNAL_PWA',
  YES: 'YES',
  NO: 'NO',
  MCQ: 'mcq',
  CHECKBOX: 'checkbox',
  QUIZ_CHECKBOX: 'option_box',
  FILL: 'fill',
  DATE_TIME: 'dob',
  attachmentFile: 'attachmentFile',
  webinar_record_link: 'webinar_record_link',
};

export const Format = {
  DateTime: 'YYYY-MM-DD HH:mm:ss',
};

export const RegexValidations = {
  EMAIL: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i,
};
