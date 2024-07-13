import * as dataAccess from '../utils/ajax';

import { API_CONSTANTS } from '../constants/api-contants';

export const getCategoryList = async (currentPage) => {
  let responseObj = await dataAccess.get(`${API_CONSTANTS.CATEGORY}`);
  return responseObj;
};
