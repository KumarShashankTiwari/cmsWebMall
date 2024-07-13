const User = {
  CREATED_SUCCESS: 'The user has been created successfully',
  UPDATED_SUCCESS: 'The user details has been updated successfully',
  CREATE_FAILURE: 'Unable to create a user. Please try again',
  DELETE_SUCCESS: 'The user account has been deleted successfully',
  DELETE_FAILURE: 'Unable to delete a user. Please try again',
  ACTIVE_INACTIVE_SUCCESS:
    'The user account has been made {{placeholder}} successfully',
  ACTIVE_INACTIVE_FAILURE:
    'Unable to make the user as {{placeholder}}. Please try again',
};

const Stores = {
  CREATED_SUCCESS: 'The Stores has been Created successfully',
  UPDATED_SUCCESS: 'The Stores has been Updated successfully',
  UPDATE_FAILURE:
    'Something went wrong the Stores not upadated. Please try again',
  CREATE_FAILURE:
    'Something went wrong the Stores not created. Please try again',
};
const Mall = {
  CREATED_SUCCESS: 'The Mall has been Created successfully',
  UPDATED_SUCCESS: 'The Mall has been Updated successfully',
  UPDATE_FAILURE:
    'Something went wrong the Mall not upadated. Please try again',
  CREATE_FAILURE: 'Something went wrong the Mall not created. Please try again',
};
const Support_Service = {
  CREATED_SUCCESS: 'The Support Service has been Created successfully',
  UPDATED_SUCCESS: 'The Support Service has been Updated successfully',
  UPDATE_FAILURE:
    'Something went wrong the Support Service not upadated. Please try again',
  CREATE_FAILURE:
    'Something went wrong the Support Service not created. Please try again',
};

const MallBanner = {
  CREATED_SUCCESS: 'The Mall Banner has been Created successfully',
  UPDATED_SUCCESS: 'The Mall Banner has been Updated successfully',
  UPDATE_FAILURE:
    'Something went wrong the Mall Banner not upadated. Please try again',
  CREATE_FAILURE:
    'Something went wrong the Mall Banner not created. Please try again',
};

const video = {
  VIDEO_SUCCESS: 'Video content created Successfully',
  VIDEO_FAIL: 'Failed to create content',
};
const Login = {
  LOGIN_SUCCESS: 'Logged in successfully',
  LOGIN_FAILURE:
    'Unable to login. This could be due invalid credential. Please try again',
};

const Password = {
  UPDATE_SUCCESS: 'The password has been updated successfully',
  CHECK_EMAIL: 'Check your Email. Reset password link will be there',
  UPDATE_FAILURE: 'Unable to update the password. Please try again',
};

const Error = {
  COMMON_MESSAGE:
    'We’re so sorry. Looks like something went wrong. Please try again.',
};

const Message = {
  Login,
  Error,
  User,
  Password,
  video,
  Stores,
  Mall,
  Support_Service,
  MallBanner,
};

export default Message;
