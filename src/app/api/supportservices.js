import * as dataAccess from '../utils/ajax';

import { API_CONSTANTS } from '../constants/api-contants';

export const getSupportServicesList = async (currentPage) => {
  let responseObj = await dataAccess.get(
    `${API_CONSTANTS.SUPPORT_DETAIL}/list?page=${currentPage}`
  );
  return responseObj;
};

export const addSupportServices = async (incomingData) => {
  let payload = {
    data: {
      ...incomingData,
    },
  };

  let responseObj = await dataAccess.post(
    `${API_CONSTANTS.SUPPORT_DETAIL}/add`,
    payload
  );

  return responseObj;
};

export const deleteSupportServices = async (id) => {
  let url = `${API_CONSTANTS.SUPPORT_DETAIL}/delete?mallId=${id}`;

  let responseObj = await dataAccess.del(url);
  return responseObj;
};

export const updateSupportServices = async (id, incomingData) => {
  let url = '';
  url = `${API_CONSTANTS.SUPPORT_DETAIL}/update?mallId=${id}`;

  let payload = {
    data: {
      ...incomingData,
    },
  };

  let responseObj = await dataAccess.put(url, payload);
  return responseObj;
};

export const getSupportServicesById = async (id) => {
  let url = `${API_CONSTANTS.SUPPORT_DETAIL}/detail?mallId=${id}`;
  let responseObj = await dataAccess.get(url);
  return responseObj;
};
