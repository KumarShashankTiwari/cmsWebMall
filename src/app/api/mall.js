import * as dataAccess from '../utils/ajax';

import { API_CONSTANTS } from '../constants/api-contants';

export const getMallList = async (currentPage) => {
  let responseObj = await dataAccess.get(
    `${API_CONSTANTS.MALL}/list?page=${currentPage}`
  );
  return responseObj;
};

export const addMall = async (incomingData) => {
  let payload = {
    data: {
      ...incomingData,
    },
  };

  let responseObj = await dataAccess.post(`${API_CONSTANTS.MALL}/add`, payload);

  return responseObj;
};

export const deleteMall = async (id) => {
  let url = `${API_CONSTANTS.MALL}/delete?mallId=${id}`;

  let responseObj = await dataAccess.del(url);
  return responseObj;
};

export const updateMall = async (id, incomingData) => {
  let url = '';
  url = `${API_CONSTANTS.MALL}/update?mallId=${id}`;

  let payload = {
    data: {
      ...incomingData,
    },
  };

  let responseObj = await dataAccess.put(url, payload);
  return responseObj;
};

export const getMallById = async (id) => {
  let url = `${API_CONSTANTS.MALL}/detail?mallId=${id}`;
  let responseObj = await dataAccess.get(url);
  return responseObj;
};

export async function uplaodBannerMedia(file) {
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

//------------Mall Banner---------------------------------------------------------------------------

export const createMallBanner = async (incomingData) => {
  let payload = {
    data: {
      ...incomingData,
    },
  };

  let responseObj = await dataAccess.post(
    `${API_CONSTANTS.CREATE_MALL_BANNER}/add`,
    payload
  );

  return responseObj;
};
export const updateMallBanner = async (incomingData) => {
  let url = '';
  url = `${API_CONSTANTS.CREATE_MALL_BANNER}/update`;

  let payload = {
    data: {
      ...incomingData,
    },
  };

  let responseObj = await dataAccess.put(url, payload);
  return responseObj;
};

export const getMallBannerById = async (id) => {
  let url = `${API_CONSTANTS.CREATE_MALL_BANNER}/detail?bannerId=${id}`;
  let responseObj = await dataAccess.get(url);
  return responseObj;
};

export const deleteMallBanner = async (id) => {
  let url = `${API_CONSTANTS.CREATE_MALL_BANNER}/delete?bannerId=${id}`;

  let responseObj = await dataAccess.del(url);
  return responseObj;
};

export const changeMallBannerOrder = async (incomingData) => {
  let payload = {
    data: incomingData,
  };

  let url = `${API_CONSTANTS.CREATE_MALL_BANNER}/sequence`;
  return await dataAccess.put(url, payload);
};
