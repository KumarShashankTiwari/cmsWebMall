import { Format } from '../constants/app-constants';
import moment from 'moment';

export const GetURLExtension = (url) => {
  if (!url) return url;
  return url.split(/[#?]/)[0].split('.').pop().trim();
};

export const ConvertObjectAsFormData = (data) => {
  var formData = new FormData();
  for (const item in data) {
    formData.append(item, data[item]);
  }
  return formData;
};

export const hanldeDontHaveAccess = (type) => {
  const dataone = handleDecodeValues();
  let isDontHaveAccess = true;
  if (!dataone?.includes(type)) {
    isDontHaveAccess = true;
  } else {
    isDontHaveAccess = false;
  }
  return isDontHaveAccess;
};

export const hanldeEncodedValues = (type) => {
  let encode = '';
  let tag_array = type.slice();
  for (let i = 0; i < tag_array.length; i++) {
    encode = btoa(tag_array[i]);
    tag_array[i] = encode;
    encode = '';
  }
  return tag_array;
};

export const handleDecodeValues = () => {
  const EncodedData = localStorage.getItem('EncodedValues');
  if (EncodedData) {
    let decode = '';
    let EncodedValues = EncodedData.split(',').slice();
    for (let i = 0; i < EncodedValues.length; i++) {
      decode = atob(EncodedValues[i].toString());
      EncodedValues[i] = decode;
      decode = '';
    }
    return EncodedValues;
  }
};

export const ParseTableDateTime = (date) => {
  if (date) {
    return moment(date).format(Format.DateTime);
  }

  return date;
};

export const ParseTableDate = (date) => {
  if (date) {
    return moment(date).format('MM/DD/YYYY');
  }

  return date;
};

export const checkIfUrl = (value) => {
  if (value?.includes('/') || value?.includes('.') || value?.includes('www')) {
    return true;
  }
  return false;
};

export const urlParser = (url) => {
  if (url?.startsWith('www.')) {
    return 'https://' + url;
  } else if (url?.startsWith('https') || url?.startsWith('http')) {
    return url;
  } else {
    return 'https://www.' + url;
  }
};

export const dataformatChanges = (date) => {
  const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss';

  return moment(date).format(dateTimeFormat);
};

export const imageSizeValidation = (e) => {
  let file = e.target.files[0];
  return file.size >= 100000;
};

export const newimageSizeValidation = (e, value = null) => {
  if (value) {
    let file = e.target.files[0];
    return file.size >= value;
  } else {
    let file = e.target.files[0];
    return file.size >= 150000;
  }
};
export const showImageUrl = (url) => {
  if (url === 'undefined' || url === '' || url === null) return '';
  if (url?.startsWith('https') || url?.startsWith('http')) {
    return url;
  }

  let newurl = `${process.env.REACT_APP_S3_BUCKET_URL}/${url}`;

  return newurl;
};

export const generateSerialNumber = (currentPage, itemsPerPage, itemIndex) => {
  return (currentPage - 1) * itemsPerPage + itemIndex + 1;
};

export const removeNullValues = (obj) => {
  const newObj = {};

  for (const key in obj) {
    if (obj[key] || obj[key] === 'null') {
      newObj[key] = obj[key];
    }
  }

  return newObj;
};

export function convertTo24HourFormat(time12h) {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');
  hours = parseInt(hours, 10);

  if (modifier === 'PM' && hours !== 12) {
    hours += 12;
  } else if (modifier === 'AM' && hours === 12) {
    hours = 0;
  }

  return `${hours.toString().padStart(2, '0')}:${minutes}`;
}
export function convertTo12HourFormat(time) {
  const [hour, minute] = time.split(':');
  const hourInt = parseInt(hour, 10);
  const ampm = hourInt >= 12 ? 'PM' : 'AM';
  const hour12 = hourInt % 12 || 12;
  return `${hour12}:${minute} ${ampm}`;
}

const Parsers = {
  showImageUrl,
  GetURLExtension,
  ConvertObjectAsFormData,
  hanldeDontHaveAccess,
  hanldeEncodedValues,
  handleDecodeValues,
  ParseTableDateTime,
  imageSizeValidation,
  ParseTableDate,
  generateSerialNumber,
  removeNullValues,
  convertTo24HourFormat,
};

export default Parsers;
