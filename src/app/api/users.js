import * as dataAccess from '../utils/ajax';
import ApiParser from '../utils/ApiParser';
import Parsers from '../utils/Parsers';

import { API_CONSTANTS } from '../constants/api-contants';

export const getUsersList = async (page) => {
  let responseObj = await dataAccess.get(`${API_CONSTANTS.GET_USER}/list`);
  return responseObj;
};
