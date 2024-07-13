/* eslint-disable */
import axios from 'axios';
import axiosRetry from 'axios-retry';

// import { Activity } from 'blinc-lib/helpers/activity-log';

import { API_CONSTANTS } from 'constants/api-contants';
import { LocalStorage } from 'utils/storage';
import { APP_CONSTANTS, LocalSessionKey } from 'constants/app-constants';
// import * as TokenStorage from './token-storage';
// import UserSession from '../helpers/userSession';
// import Global from '../helpers/global';
// old code
// axiosRetry(axios, { retries: 2, shouldResetTimeout: true });
axiosRetry(axios, {
  retries: 1,
  shouldResetTimeout: true,
  retryCondition: (error) => {
    console.log('Error: ', error);
    return (
      axiosRetry.isNetworkOrIdempotentRequestError(error) ||
      error.code === 'ECONNABORTED'
    );
  },
});

const METHOD_GET = 'GET';
const METHOD_POST = 'POST';
const METHOD_PUT = 'PUT';
const METHOD_PATCH = 'PATCH';
const METHOD_DELETE = 'DELETE';
//1 minute = 60000 for API timeout
const TIMEOUT = 60000;
// const TIMEOUT_2MINUTE = 120000;
// const TIMEOUT_3MINUTE = 180000;
// const TIMEOUT_5MINUTE = 300000;

let failedRequests = [];
let isRefreshing = false;
let autocompleteCancelToken = null;

export const fetchCall = () => {};

function processQueue(error, token = null) {
  failedRequests.forEach(({ promise, config }) => {
    if (error) {
      promise.reject(error);
    } else {
      config.headers.accesstoken = token;
      axios
        .request(config)
        .then((response) => {
          // promise.resolve(response);
          if (response.status === 204) {
            const data = {
              response: {
                code: 204,
                alert: [{ message: 'No content' }],
              },
            };
            promise.resolve(data);
          } else {
            promise.resolve(response.data);
          }
        })
        .catch((error) => {
          //   // promise.reject(error);
          //     ;
          //   try {
          //     Activity.logAPIErrorActivity({
          //       url: config.url,
          //       error,
          //       apiError: true,
          //       type: 'app',
          //     });
          //   } catch (ex) {}
          if (error.response && error.response.data) {
            let obj;
            obj = {
              ...error.response.data,
              response: {
                ...error.response.data.response,
                alert: [
                  {
                    ...error.response.data.response.alert[0],
                    message: error.response.data.response.error_code,
                  },
                ],
              },
            };
            promise.resolve(obj);
            return;
          }
          let errorCode = '';
          try {
            if (
              error.response.data.response &&
              error.response.data.response.error_code
            ) {
              errorCode = error.response.data.response.error_code;
            }
          } catch (ex) {}
          if (error && error.response && error.response.status !== 200) {
            promise.resolve({
              response: {
                code: error.response.status,
                status: error.response.statusText,
                error_code: errorCode,
                alert: [
                  {
                    message: errorCode,
                    type: 'failure',
                  },
                ],
              },
            });
            return;
          } else {
            promise.resolve({
              response: {
                code: 400,
                status: 'failure',
                error_code: errorCode,
                alert: [
                  {
                    message: errorCode,
                    type: 'failure',
                  },
                ],
              },
            });
          }
        });
    }
  });
  failedRequests = [];
}

axios.interceptors.response.use(
  (response) => {
    // Return a successful response back to the calling service
    return response;
  },
  (error) => {
    // try {
    //   Activity.logAPIErrorActivity({
    //     url: config.url,
    //     response,
    //     error,
    //     apiError: true,
    //     type: 'app',
    //   });
    // } catch (ex) {}

    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        code: 'ECONNABORTED',
        data: {
          response: {
            code: 400,
            error_code: 0,
            status: 'success',
            alert: [
              { message: 'Timeout Error', type: 'success', skippable: 1 },
            ],
            from_cache: 0,
            is_data: 0,
          },
        },
      });
    }

    const { response, config } = error;

    if (!config || !response) return;

    // if (config.url === API_CONSTANTS.REFRESH_TOKEN) {
    //   UserSession.setSessionExpiryFunction(true);
    //   return new Promise((resolve, reject) => {
    //     reject(error);
    //   });
    // }

    // Return any error which is not due to authentication back to the calling service
    if (
      response &&
      (response.status === 401 || response.status === 403) &&
      config &&
      !config.__isRetryRequest
    ) {
      window.localStorage.clear();
      window.location.href = APP_CONSTANTS.LOGIN;
      // if (isRefreshing) {
      //   try {
      //     return new Promise((resolve, reject) => {
      //       const options = {
      //         promise: {
      //           resolve,
      //           reject,
      //         },
      //         config,
      //       };
      //       failedRequests.push(options);
      //     });
      //   } catch (e) {
      //     return e;
      //   }
      //   return 1;
      // }
      isRefreshing = true;
      config.__isRetryRequest = true;
      // Try request again with new token
      // return TokenStorage.getNewToken()
      //   .then((token) => {
      //     // New request with new token
      //     const { config } = error;
      //     config.headers.accesstoken = token;
      //     processQueue(null, token);

      //     setTimeout(() => {
      //       isRefreshing = false;
      //     }, 3000);

      //     return new Promise((resolve, reject) => {
      //       axios
      //         .request(config)
      //         .then((response) => {
      //           resolve(response);
      //         })
      //         .catch((error) => {
      //           // // reject(error);
      //            ;
      //           // try {
      //           //   Activity.logAPIErrorActivity({
      //           //     url: config.url,
      //           //     error,
      //           //     apiError: true,
      //           //     type: 'app',
      //           //   });
      //           // } catch (ex) {}

      //           if (error.response && error.response.data) {
      //             let obj;
      //             obj = {
      //               ...error.response.data,
      //               response: {
      //                 ...error.response.data.response,
      //                 alert: [
      //                   {
      //                     ...error.response.data.response.alert[0],
      //                     message: error.response.data.response.error_code,
      //                   },
      //                 ],
      //               },
      //             };
      //             resolve(obj);
      //             return;
      //           }
      //           let errorCode = "";
      //           try {
      //             if (error.response.data.response && error.response.data.response.error_code) {
      //               errorCode = error.response.data.response.error_code;
      //             }
      //           } catch (ex) {}
      //           if (error && error.response && error.response.status !== 200) {
      //             resolve({
      //               response: {
      //                 code: error.response.status,
      //                 status: error.response.statusText,
      //                 error_code: errorCode,
      //                 alert: [
      //                   {
      //                     message: errorCode,
      //                     type: "failure",
      //                   },
      //                 ],
      //               },
      //             });
      //             return;
      //           } else {
      //             resolve({
      //               response: {
      //                 code: 400,
      //                 status: "failure",
      //                 error_code: errorCode,
      //                 alert: [
      //                   {
      //                     message: errorCode,
      //                     type: "failure",
      //                   },
      //                 ],
      //               },
      //             });
      //           }
      //         });
      //     });
      //   })
      //   .catch((error) => {
      //     return new Promise((resolve, reject) => {
      //        ;
      //       // try {
      //       //   Activity.logAPIErrorActivity({
      //       //     url: config.url,
      //       //     error,
      //       //     apiError: true,
      //       //     type: 'app',
      //       //   });
      //       // } catch (ex) {}
      //       if (error.response && error.response.data) {
      //         let obj;
      //         obj = {
      //           data: {
      //             ...error.response.data,
      //             response: {
      //               ...error.response.data.response,
      //               alert: [
      //                 {
      //                   ...error.response.data.response.alert[0],
      //                   message: error.response.data.response.error_code,
      //                 },
      //               ],
      //             },
      //           },
      //         };
      //         resolve(obj);
      //         return;
      //       }
      //       let errorCode = "";
      //       try {
      //         if (error.response.data.response && error.response.data.response.error_code) {
      //           errorCode = error.response.data.response.error_code;
      //         }
      //       } catch (ex) {}
      //       resolve({
      //         data: {
      //           response: {
      //             code: error.response.status,
      //             status: error.response.statusText,
      //             error_code: errorCode,
      //             alert: [
      //               {
      //                 message: errorCode,
      //                 type: "failure",
      //               },
      //             ],
      //           },
      //         },
      //       });
      //     });
      //   });
    }
    return new Promise((resolve, reject) => {
      console.log('Interceptor Response: ', error.response);
      // reject(error);
      let errorCode = '';
      let data;
      //     ;
      //   try {
      //     Activity.logAPIErrorActivity({
      //       url: config.url,
      //       error,
      //       apiError: true,
      //       type: 'app',
      //     });
      //   } catch (ex) {}
      try {
        if (
          error.response.data.response &&
          error.response.data.response.error_code
        ) {
          errorCode = error.response.data.response.error_code;
        }
      } catch (ex) {}
      if (error.response && error.response.data && error.response.data.data) {
        data = error.response.data.data;
      }
      resolve({
        data: {
          data,
          response: {
            ...error.response.data.response,
            code: error.response.status,
            status: error.response.statusText,
            error_code: errorCode,
            alert: [
              {
                message: errorCode,
                type: 'failure',
              },
            ],
          },
        },
      });
    });
  }
);

const getHeaders = (isReturnAccessToken = true) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  // const accessToken = UserSession.accessToken;
  const accessToken = LocalStorage.get(LocalSessionKey.ACCESS_TOKEN);
  if (accessToken && isReturnAccessToken) {
    headers.accesstoken = accessToken;
  }
  return headers;
};

const getUploadHeaders = (isReturnAccessToken = true) => {
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  // const accessToken = UserSession.accessToken;
  const accessToken = LocalStorage.get(LocalSessionKey.ACCESS_TOKEN);
  if (accessToken && isReturnAccessToken) {
    headers.accesstoken = accessToken;
  }
  return headers;
};

export async function makeHttpRequest(url, method, payload, isStringify) {
  const { data } = payload;
  let { headers } = payload;
  // console.log(`${url}`);
  // console.log(JSON.stringify(data));

  return new Promise(function (resolve, reject) {
    try {
      if (url === null || url === undefined || url === '') {
        reject(new Error('URL not present.'));
      } else {
        let options = {};
        if (isStringify === 'upload') {
          headers = getUploadHeaders();
        } else if (!headers) {
          headers = getHeaders();
        } else {
          headers = Object.assign(
            headers,
            getHeaders(!headers.accesstoken, isStringify)
          );
        }

        options = {
          timeout: TIMEOUT,
          method,
          headers,
          url,
          maxRedirects: 1,
          // `transformResponse` allows changes to the response data to be made before
          // it is passed to then/catch
          transformResponse: [
            function (data) {
              if (typeof data === 'string' && data != '') {
                return JSON.parse(data);
              }
              // Do whatever you want to transform the data
              return data;
            },
          ],
        };

        // // Search Results API
        // if (url === GET_FLIGHT_RESULTS) {
        //   options.timeout = TIMEOUT_3MINUTE;
        // } else if (
        //   url === GET_FLIGHT_PRICE ||
        //   url === SELL_FLIGHT ||
        //   url === BOOK_FLIGHT
        // ) {
        //   options.timeout = TIMEOUT_5MINUTE;
        // }

        if (method !== 'GET') {
          options.data = isStringify !== 'upload' ? JSON.stringify(data) : data;
        }

        // const client = axios(options);
        // axiosRetry(client, { retries: 2, shouldResetTimeout: true });
        // Send a POST request

        // if (url === GET_AUTOCOMPLETE && !Global.$disableAutocompleteCancel) {
        //   //Check if there are any previous pending requests
        //   if (autocompleteCancelToken !== null) {
        //     autocompleteCancelToken.cancel(
        //       'Operation canceled due to new request.'
        //     );
        //   }
        //   autocompleteCancelToken = axios.CancelToken.source();
        //   options.cancelToken = autocompleteCancelToken.token;
        // }

        // if (
        //   url === GET_WALLET_MASTER ||
        //   url === GET_BANK_MASTER ||
        //   url === GET_SPECIAL_SERVICE
        // ) {
        //   debugger;
        // }
        axios(options)
          .then((response) => {
            if (response.status === 204) {
              const data = {
                response: {
                  code: 204,
                  alert: [{ message: 'No content' }],
                },
              };
              resolve(data);
            } else {
              resolve(response.data);
            }

            // if (response.status !== 200 && response.status !== 204) {
            //     ;
            //   try {
            //     Activity.logAPIErrorActivity({
            //       url: url,
            //       status: response.status,
            //       statusText: response.statusText,
            //       requestPayload: response.config.data,
            //       apiError: true,
            //       type: 'app',
            //     });
            //   } catch (ex) {}
            // }
          })
          .catch((error) => {
            try {
              Activity.logAPIErrorActivity({
                url: url,
                error,
                apiError: true,
                type: 'app',
              });
            } catch (ex) {}

            console.log('Error Response: ', error.response);
            if (error.response && error.response.data) {
              let obj;
              obj = {
                ...error.response.data,
                response: {
                  ...error.response.data.response,
                  alert: [
                    {
                      ...error.response.data.response.alert[0],
                      message: error.response.data.response.error_code,
                    },
                  ],
                },
              };
              resolve(obj);
              return;
            }
            let errorCode = '';
            try {
              if (
                error.response.data.response &&
                error.response.data.response.error_code
              ) {
                errorCode = error.response.data.response.error_code;
              }
            } catch (ex) {}
            if (error && error.response && error.response.status !== 200) {
              resolve({
                response: {
                  code: error.response.status,
                  status: error.response.statusText,
                  error_code: errorCode,
                  alert: [
                    {
                      message: errorCode,
                      type: 'failure',
                    },
                  ],
                },
              });
              return;
            } else {
              resolve({
                response: {
                  code: 400,
                  status: 'failure',
                  error_code: errorCode,
                  alert: [
                    {
                      message: errorCode,
                      type: 'failure',
                    },
                  ],
                },
              });
            }
          });
      }
    } catch (error) {
      //     ;
      //   try {
      //     Activity.logAPIErrorActivity({
      //       url: url,
      //       error,
      //       apiError: true,
      //       type: 'app',
      //     });
      //   } catch (ex) {}
      //   reject(error);
    }
  });
}

export async function makeHttpDownload(url, method, payload, isStringify) {
  const { data } = payload;
  let { headers } = payload;
  console.log(`URL${url}`);

  return new Promise(function (resolve, reject) {
    try {
      if (url === null || url === undefined || url === '') {
        reject(new Error('URL not present.'));
      } else {
        headers = getHeaders();
        let options = {
          timeout: TIMEOUT,
          headers,
          method,
          url,
          maxRedirects: 1,
          responseType: 'blob',
        };
        if (method === 'POST') {
          options = { ...options, data: JSON.stringify(data) };
        }
        axios(options)
          .then((response) => {
            resolve(response.data);
          })
          .catch((error) => {
            if (error.response && error.response.data) {
              let obj;
              obj = {
                ...error.response.data,
                response: {
                  ...error.response.data.response,
                  alert: [
                    {
                      ...error.response.data.response.alert[0],
                      message: error.response.data.response.error_code,
                    },
                  ],
                },
              };
              resolve(obj);
              return;
            }
            let errorCode = '';
            try {
              if (
                error.response.data.response &&
                error.response.data.response.error_code
              ) {
                errorCode = error.response.data.response.error_code;
              }
            } catch (ex) {}
            if (error && error.response) {
              let data = error.response.data;
              if (
                data &&
                data.response &&
                data.response.alert &&
                data.response.alert.length > 0
              ) {
                data.response.alert[0].message = errorCode;
              }
              resolve(data);
              return;
            } else {
              resolve({
                response: {
                  code: 400,
                  status: 'failure',
                  error_code: errorCode,
                  alert: [
                    {
                      message: errorCode,
                      type: 'failure',
                    },
                  ],
                },
              });
            }
          });
      }
    } catch (error) {
      reject(error);
    }
  });
}

export async function get(url, payload = {}) {
  return makeHttpRequest(url, METHOD_GET, payload, true);
}

export async function post(url, payload = {}) {
  return makeHttpRequest(url, METHOD_POST, payload, true);
}

export async function put(url, payload = {}) {
  return makeHttpRequest(url, METHOD_PUT, payload, true);
}

export async function patch(url, payload = {}) {
  return makeHttpRequest(url, METHOD_PATCH, payload, true);
}

export async function del(url, payload = {}) {
  return makeHttpRequest(url, METHOD_DELETE, payload, true);
}

export async function upload(url, payload = {}) {
  return makeHttpRequest(url, METHOD_POST, payload, 'upload');
}

export async function download(url, payload = {}) {
  return makeHttpDownload(url, METHOD_POST, payload, true);
}

export async function getAll(urls, payload = {}) {
  return Promise.all(
    urls.map((url) => makeHttpRequest(url, METHOD_GET, payload, true))
  ).then((data) => {
    return data;
  });
}

export async function getAllData(urls, payloads, methods) {
  return Promise.all(
    urls.map((url, index) =>
      makeHttpRequest(url, methods[index], payloads[index], true)
    )
  ).then((data) => {
    return data;
  });
}
