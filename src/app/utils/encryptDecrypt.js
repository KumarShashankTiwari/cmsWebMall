/**
 * Encrypt the json object and store into localstorage
 *
 * @param {string} key Localstorage Key
 * @param {object} data Localstorage data - json object
 */
 export function encryption(key, data) {
    const ecytData = window?.btoa(unescape(encodeURIComponent(JSON.stringify(data))));
    localStorage.setItem(key, ecytData);
    return true;
  }
  
  /**
   * Decrypt the json object and retive data from localstorage
   *
   * @param {string} key Localstorage Key
   */
  export function decryption(key) {
    const lsData = localStorage.getItem(key);
    const dcypData = decodeURIComponent(escape(window?.atob(lsData)));
    return JSON.parse(dcypData);
  }
  