const { LocalSessionKey } = require('../constants/app-constants');

function parseJson(str) {
  try {
    if (typeof str === 'string' || str instanceof String) {
      // it's a string
      return str;
    }

    return JSON.parse(str);
  } catch (e) {
    return str;
  }
}

/* Session Storage */
function setSession(key, str) {
  let parsedVal = str;
  if (parsedVal && typeof str !== 'string') {
    parsedVal = JSON.stringify(parsedVal);
  }
  sessionStorage.setItem(key, parsedVal);
}

function getSession(key) {
  let value = sessionStorage.getItem(key);
  if (!value) {
    return value;
  }
  value = parseJson(value);
  return value;
}

function removeSession(key) {
  if (sessionStorage.getItem(key)) {
    sessionStorage.removeItem(key);
  }
}

/* LocalStorage */
function setLocal(key, str) {
  let parsedVal = str;
  if (parsedVal && typeof str !== 'string') {
    parsedVal = JSON.stringify(parsedVal);
  }
  localStorage.setItem(key, parsedVal);
}

function getLocal(key) {
  let value = localStorage.getItem(key);
  if (!value) {
    return value;
  }
  value = parseJson(value);
  return value;
}

function removeLocal(key) {
  if (localStorage.getItem(key)) {
    localStorage.removeItem(key);
  }
}

function clearLocalStorage() {
  removeLocal(LocalSessionKey.ACCESS_TOKEN);
  removeLocal(LocalSessionKey.REFRESH_TOKEN);
  removeLocal(LocalSessionKey.FEED_ID);
  removeLocal(LocalSessionKey.PERMISSSION_TAG);
}

function clearSessionStorage() {
  removeSession(LocalSessionKey.ACCESS_TOKEN);
  removeSession(LocalSessionKey.REFRESH_TOKEN);
  removeSession(LocalSessionKey.FEED_ID);
  removeSession(LocalSessionKey.PERMISSSION_TAG);
}

const SessionStorage = {
  set: setSession,
  get: getSession,
  remove: removeSession,
  clear: clearSessionStorage,
};

const LocalStorage = {
  set: setLocal,
  get: getLocal,
  remove: removeLocal,
  clear: clearLocalStorage,
};

module.exports = {
  SessionStorage,
  LocalStorage,
};
