import * as dataAccess from '../utils/ajax';

import { API_CONSTANTS } from '../constants/api-contants';

export const getEminitiesList = async (currentPage) => {
  let responseObj = await dataAccess.get(`${API_CONSTANTS.EMINITIES}/list`);
  return responseObj;
};
