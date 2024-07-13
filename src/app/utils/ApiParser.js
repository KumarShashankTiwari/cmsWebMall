import Parsers from './Parsers';

export const parseAuthenticate = (responseObj) => {
  let responsePayload = {
    tableData: [],
    error: false,
    message: '',
    pagination: {},
    summary: {},
  };

  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    if (responseObj.data && responseObj.data.access_token) {
      responsePayload.data = responseObj.data;
      responsePayload.error = false;
    }
  } else {
    responsePayload.error = true;
    if (
      responseObj.response &&
      responseObj.response.alert &&
      responseObj.response.alert.length > 0 &&
      responseObj.response.alert[0].message
    ) {
      responsePayload.message = responseObj.response.alert[0].message;
    }
  }

  return responsePayload;
};

export const parseLogin = (responseObj) => {
  let responsePayload = {
    tableData: [],
    error: false,
    message: '',
    pagination: {},
    summary: {},
  };

  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200
  ) {
    if (responseObj.data && responseObj.data.access_token) {
      responsePayload.data = responseObj.data;
      responsePayload.error = false;
    }
  } else {
    responsePayload.error = true;
    if (
      responseObj.response &&
      responseObj.response.alert &&
      responseObj.response.alert.length > 0 &&
      responseObj.response.alert[0].message
    ) {
      responsePayload.message = responseObj.response.alert[0].message;
    }
  }

  return responsePayload;
};

export const parseFeedListing = (responseObj) => {
  let responsePayload = {
    tableData: [],
    error: false,
    message: '',
    pagination: {},
    summary: {},
  };

  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200 &&
    responseObj.data
  ) {
    if (responseObj.data.articles && responseObj.data.articles.length > 0) {
      responseObj.data.articles.forEach((item) => {
        responsePayload.tableData.push({
          ...item,

          // last_updated_time: Parsers.ParseTableDateTime(item.last_updated_time),
        });
      });
    }

    responsePayload.error = false;
    responsePayload.pagination = {
      ...responseObj.data.pagination,
    };
    let { articles_status } = responseObj.data;
    responsePayload.summary = {
      totalArticle: articles_status.total_articles,
      activeArticle: articles_status.active_articles,
      inActiveArticle: articles_status.in_active_articles,
    };
  } else {
    responsePayload.error = true;
    if (
      responseObj.response &&
      responseObj.response.alert &&
      responseObj.response.alert.length > 0 &&
      responseObj.response.alert[0].message
    ) {
      responsePayload.message = responseObj.response.alert[0].message;
    }
  }

  return responsePayload;
};
export const parseServiceListing = (responseObj) => {
  let responsePayload = {
    tableData: [],
    error: false,
    message: '',
    pagination: {},
    summary: {},
  };

  if (
    responseObj &&
    responseObj.response &&
    responseObj.response.code === 200 &&
    responseObj.data
  ) {
    if (responseObj.data && responseObj.data.length > 0) {
      responseObj.data.forEach((item) => {
        responsePayload.tableData.push({
          ...item,
          toggle: item.is_active === 'INACTIVE' ? false : true,
          status: item.is_active === 'INACTIVE' ? 'INACTIVE' : 'ACTIVE',
          updated_on: Parsers.ParseTableDateTime(item.updated_on),

          // last_updated_time: Parsers.ParseTableDateTime(item.last_updated_time),
        });
      });
    }

    responsePayload.error = false;
    responsePayload.pagination = {
      ...responseObj.data.pagination,
    };
  } else {
    responsePayload.error = true;
    if (
      responseObj.response &&
      responseObj.response.alert &&
      responseObj.response.alert.length > 0 &&
      responseObj.response.alert[0].message
    ) {
      responsePayload.message = responseObj.response.alert[0].message;
    }
  }

  return responsePayload;
};

const ApiParser = {
  // parseLogout,
  parseAuthenticate,
  parseLogin,
  parseFeedListing,
  parseServiceListing,
};

export default ApiParser;
