import * as dataAccess from '../utils/ajax';

import { API_CONSTANTS } from '../constants/api-contants';

export const getStoreList = async (currentPage) => {
  let responseObj = await dataAccess.get(
    `${API_CONSTANTS.STORE}/list?page=${currentPage}`
  );
  return responseObj;
};

export const addStore = async (incomingData) => {
  let payload = {
    data: {
      ...incomingData,
    },
  };
  let response = await dataAccess.post(`${API_CONSTANTS.STORE}/add`, payload);
  return response;
};
export const updateStore = async (id, incomingData) => {
  let url = '';
  url = `${API_CONSTANTS.STORE}/update?id=${id}`;

  let payload = {
    data: {
      ...incomingData,
    },
  };
  let response = await dataAccess.put(url, payload);
  return response;
};

export const getStoreById = async (id) => {
  let url = `${API_CONSTANTS.STORE}/detail?storeId=${id}&page=1`;

  let responseObj = await dataAccess.get(url);
  return responseObj;
};

export const deleteStore = async (id) => {
  let url = `${API_CONSTANTS.STORE}/delete?storesId=${id}`;
  let payload = {
    data: {
      id: id,
    },
  };
  let responseObj = await dataAccess.del(url, payload);
  return responseObj;
};
export async function uplaodMedia(file) {
  let formData = new FormData();
  formData.append('image', file);
  let payload = {
    data: formData,
  };

  let responseObj = await dataAccess.upload(
    `${API_CONSTANTS.MEDIA_UPLOAD}`,
    payload
  );

  return responseObj;
}
