import Fingerprint2 from 'fingerprintjs2';
import {LocalStorage} from 'utils/storage';
import {LocalSessionKey} from 'constants/app-constants';
import {
  osVersion,
  osName,
  browserVersion,
  browserName,
} from 'react-device-detect';

const GetFingerprint = async () => {
  return new Promise((resolve, reject) => {
    Fingerprint2.get(function (components) {
      const values = components.map(function (component) {
        return component.value;
      });
      const murmur = Fingerprint2.x64hash128(values.join(''), 31);
      resolve(murmur);
    });
  })
}

const GetAuthPayload = async () => {
    let fingerprint = LocalStorage.get(LocalSessionKey.FINGERPRINT);
    if(!fingerprint) {
      // Create a fingerprint and save if not exist in local storage
      fingerprint = await GetFingerprint();
      if(!fingerprint) {
        // Hard coded fingerprint if unable to create fingerprint
        fingerprint = 'fingerprint1';
      }
      LocalStorage.set(LocalSessionKey.FINGERPRINT, fingerprint);
    }

    let payload = {
        fingerprint,
        device_type: 'DESKTOP',
        device_name: 'samsung',
        os: osName,
        os_version: osVersion,
        browser: browserName,
        browser_version: browserVersion,
        application_version: process.env.REACT_APP_APP_VERSION,
        type: 'web'
    }

    return payload;
}

export default GetAuthPayload;