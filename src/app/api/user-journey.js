import { API_CONSTANTS } from "app/constants/api-contants";
import * as dataAccess from "utils/ajax";
import Parsers from "utils/Parsers";
import Toast from "app/utils/Toast";

export const getUserJourneyList = async () => {
  let responseObj = await dataAccess.get(API_CONSTANTS.GET_USER_JOURNEY_LIST);
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    return responseObj.data;
  } else {
    return [];
  }
};

export const createTask = async (incomingData) => {
  let formData = Parsers.ConvertObjectAsFormData(incomingData);
  let payload = {
    data: formData,
  };
  return await dataAccess.upload(API_CONSTANTS.POST_USER_JOURNEY_TASK, payload);
};

export const getTaskDetailsByID = async (id) => {
  let responseObj = await dataAccess.get(
    `${API_CONSTANTS.GET_USER_JOURNEY_TASK_DETAIL}/${id}`
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    return responseObj.data;
  } else {
    return [];
  }
};

export const updateTaskDetail = async (incomingData) => {
  let formData = Parsers.ConvertObjectAsFormData(incomingData);
  let payload = {
    data: formData,
  };
  let response = dataAccess.update(
    API_CONSTANTS.POST_USER_JOURNEY_TASK,
    payload
  );
  return response;
};

export async function deleteTaskById(id) {
  let responseObj = await dataAccess.del(
    `${API_CONSTANTS.GET_USER_JOURNEY_TASK_DETAIL}/${id}`
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    Toast.success(responseObj.response.alert[0].message);
  }
}

export const getUserJourneyRewardList = async () => {
  let responseObj = await dataAccess.get(
    API_CONSTANTS.GET_USER_JOURNEY_REWARD_LIST
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    return responseObj.data ? responseObj.data : [];
  } else {
    return [];
  }
};

export const getUserJourneyCouponList = async () => {
  let responseObj = await dataAccess.get(
    API_CONSTANTS.GET_USER_JOURNEY_COUPON_LIST
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    return responseObj.data ? responseObj.data : [];
  } else {
    return [];
  }
};

export const createCoupon = async (incomingData) => {
  let payload = {
    data: incomingData,
  };
  return await dataAccess.post(API_CONSTANTS.POST_USER_JOURNEY_COUPON, payload);

  // let responseObj = await dataAccess.post(`${API_CONSTANTS.POST_USER_JOURNEY_COUPON}`, { data: incomingData });
  // return responseObj;
};
export const getCouponDetailsByID = async (id) => {
  let responseObj = await dataAccess.get(
    `${API_CONSTANTS.GET_USER_JOURNEY_COUPON_DETAIL}/${id}`
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    return responseObj.data;
  } else {
    return [];
  }
};

export const updateCouponDetail = async (incomingData) => {
  let payload = {
    data: incomingData,
  };
  let response = dataAccess.put(
    API_CONSTANTS.POST_USER_JOURNEY_COUPON,
    payload
  );
  return response;
};

export async function deleteCouponById(id) {
  let responseObj = await dataAccess.del(
    `${API_CONSTANTS.GET_USER_JOURNEY_COUPON_DETAIL}/${id}`
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    Toast.success(responseObj.response.alert[0].message);
  }
}

export const createReward = async (incomingData) => {
  let formData = Parsers.ConvertObjectAsFormData(incomingData);
  let payload = {
    data: formData,
  };
  return await dataAccess.upload(
    API_CONSTANTS.POST_USER_JOURNEY_REWARD,
    payload
  );
};
export const getRewardDetailsByID = async (id) => {
  let responseObj = await dataAccess.get(
    `${API_CONSTANTS.GET_USER_JOURNEY_REWARD_DETAIL}/${id}`
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    return responseObj.data;
  } else {
    return [];
  }
};

export const getRewardLocalisationDetailsByID = async (id, lang) => {
  let responseObj = await dataAccess.get(
    `${API_CONSTANTS.GET_USER_JOURNEY_REWARD_DETAIL_VERSION}/${id}?lang=${lang}`
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    return responseObj.data;
  } else {
    return [];
  }
};

export const updateRewardDetail = async (incomingData) => {
  let formData = Parsers.ConvertObjectAsFormData(incomingData);
  let payload = {
    data: formData,
  };
  let response = dataAccess.update(
    API_CONSTANTS.POST_USER_JOURNEY_REWARD,
    payload
  );
  return response;
};

export async function deleterewardById(id) {
  let responseObj = await dataAccess.del(
    `${API_CONSTANTS.GET_USER_JOURNEY_REWARD_DETAIL}/${id}`
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    Toast.success(responseObj.response.alert[0].message);
  }
}

export const getUserJourneyMilestoneList = async () => {
  let responseObj = await dataAccess.get(
    API_CONSTANTS.GET_USER_JOURNEY_MILESTONE_LIST
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    return responseObj.data ? responseObj.data : [];
  } else {
    return [];
  }
};

export const createMilestone = async (incomingData) => {
  let formData = Parsers.ConvertObjectAsFormData(incomingData);
  let payload = {
    data: formData,
  };
  return await dataAccess.upload(
    API_CONSTANTS.POST_USER_JOURNEY_MILESTONE,
    payload
  );
};

export const updateMilestone = async (incomingData) => {
  let formData = Parsers.ConvertObjectAsFormData(incomingData);
  let payload = {
    data: formData,
  };
  return await dataAccess.update(
    API_CONSTANTS.POST_USER_JOURNEY_MILESTONE,
    payload
  );
};

export const updateMilestoneLocalisation = async (incomingData, lang) => {
let formData = Parsers.ConvertObjectAsFormData(incomingData);
  let payload = {
    data: formData,
  };
  return await dataAccess.update(
    `${API_CONSTANTS.GET_USER_JOURNEY_REWARD_DETAIL_VERSION}/${incomingData?.reward_id}?lang=${lang}`,
    payload
  );
};

export async function deleteMilestoneById(id) {
  let responseObj = await dataAccess.del(
    `${API_CONSTANTS.DELETE_USER_JOURNEY_MILESTONE_DETAIL}/${id}`
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    Toast.success(responseObj.response.alert[0].message);
  }
}

export const updateUserJourneyMilestoneStatus = async (incomingData) => {
  // let formData = Parsers.ConvertObjectAsFormData(incomingData)
  let payload = {
    data: incomingData,
  };
  let response = dataAccess.put(
    API_CONSTANTS.UPDATE_USER_JOURNEY_MILESTONE_STATUS,
    payload
  );
  return response;
};

export const getUserJourneyAdTaskList = async () => {
  let responseObj = await dataAccess.get(
    API_CONSTANTS.GET_USER_JOURNEY_ADTASK_LIST
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    return responseObj.data ? responseObj.data : [];
  } else {
    return [];
  }
};

export const getUserJourneyAdTaskTypeList = async () => {
  let responseObj = await dataAccess.get(
    API_CONSTANTS.GET_USER_JOURNEY_TASK_TYPE_LISTS
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    return responseObj.data;
  } else {
    return [];
  }
};

export const getUserJourneyAdTaskTypeDetailsByID = async (id, lang) => {
  let responseObj = await dataAccess.get(
    `${API_CONSTANTS.GET_USER_JOURNEY_ADTASK_DETAIL_VERSION}/${id}?lang=${lang}`
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    return responseObj.data;
  } else {
    return [];
  }
};

export const updateUserJourneyAdTaskTypeDetailsByID = async (data, id) => {
  let formData = Parsers.ConvertObjectAsFormData(data);
  let payload = {
    data: formData,
  };
  return await dataAccess.update(
    `${API_CONSTANTS.UPDATE_USER_JOURNEY_ADTASK_DETAIL_VERSION}/${id}`,
    payload
  );
};

export const createUserJourneyAdTask = async (
  incomingData,
  thumbnail_image
) => {
  let data = {
    task_details: JSON.stringify(incomingData),
    thumbnail_image,
  };
  let formData = Parsers.ConvertObjectAsFormData(data);
  let payload = {
    data: formData,
  };

  return await dataAccess.upload(
    API_CONSTANTS.CREATE_USER_JOURNEY_AD_TASK,
    payload
  );
};

export const updateUserJourneyAdTask = async (
  incomingData,
  thumbnail_image
) => {
  let data = {
    task_details: JSON.stringify(incomingData),
    thumbnail_image,
  };
  let formData = Parsers.ConvertObjectAsFormData(data);
  let payload = {
    data: formData,
  };

  return await dataAccess.update(
    API_CONSTANTS.CREATE_USER_JOURNEY_AD_TASK,
    payload
  );
};

export const updateUserJourneyAdTaskStatus = async (incomingData) => {
  // let formData = Parsers.ConvertObjectAsFormData(incomingData)
  let payload = {
    data: incomingData,
  };
  let response = dataAccess.put(
    API_CONSTANTS.UPDATE_USER_JOURNEY_AD_TASK_STATUS,
    payload
  );
  return response;
};

export async function deleteAdTaskById(id) {
  let responseObj = await dataAccess.del(
    `${API_CONSTANTS.CREATE_USER_JOURNEY_AD_TASK}/${id}`
  );
  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    Toast.success(responseObj.response.alert[0].message);
  }
}
