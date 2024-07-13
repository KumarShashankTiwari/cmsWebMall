import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

// Utils

import Message from '../../../utils/Message';
import Toast from '../../../utils/Toast';
import { validate, validationRules } from './validationCheck';
import { addMall, getMallById, updateMall } from '../../../api/mall';
import { uplaodMedia } from '../../../api/store';
import {
  convertTo12HourFormat,
  convertTo24HourFormat,
} from '../../../utils/Parsers';

const useCreateMall = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pageLoading, setPageLoading] = useState(false);

  const [error, setErrors] = useState({});
  const [values, setValues] = useState({
    mallName: '',
    description: '',
    address: '',
    city: '',
    location: '',
    contact_number: '',
    opening_time: '10:00',
    closing_time: '17:00',
    logo: null,
    status: false,
  });

  const mall_id = location?.state?.id ? location?.state?.id : '';

  useEffect(() => {
    if (mall_id) {
      loadStoreData(mall_id);
    }
  }, [mall_id]);

  async function loadStoreData(id) {
    if (!id) {
      return;
    }
    // '41060749-282c-4178-9f48-d854dc3ba5f0'
    setPageLoading(true);
    let response = await getMallById(id);
    setPageLoading(false);
    if (response?.responseCode === 200) {
      let responsedata = response?.data[0];

      setValues({
        description: responsedata?.description,
        logo: responsedata?.logo,
        mallName: responsedata?.name,
        opening_time:
          responsedata?.openingTime &&
          convertTo24HourFormat(responsedata?.openingTime),
        closing_time:
          responsedata?.closingTime &&
          convertTo24HourFormat(responsedata?.closingTime),
        contact_number: responsedata?.phoneNumber,
        location: responsedata?.location,
        city: responsedata?.city,
        address: responsedata?.address,
        status: responsedata?.status,
      });
    } else {
      Toast.error(
        response?.data ? response?.data : Message.Error.COMMON_MESSAGE
      );
    }
  }

  async function callAddOrUpdateAPI() {
    setPageLoading(true);
    let response = {};

    let senddata = {
      ...values,
      name: values.mallName,
      opening_time: convertTo12HourFormat(values.opening_time),
      closing_time: convertTo12HourFormat(values.closing_time),
    };

    if (mall_id) {
      response = await updateMall(mall_id, { ...senddata });
    } else {
      response = await addMall({ ...senddata });
    }
    setPageLoading(false);

    if (response?.responseCode === 200) {
      Toast.success(
        mall_id ? Message.Mall.UPDATED_SUCCESS : Message.Mall.CREATED_SUCCESS
      );
      navigate(-1);
    } else {
      Toast.error(
        response?.error ? response?.error : Message.Error.COMMON_MESSAGE
      );
    }
  }

  function handleCreateMall(e) {
    e.preventDefault();
    const validationErrors = validate(values, validationRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      callAddOrUpdateAPI();
    }
  }

  function handleTime(value, name) {
    setValues({
      ...values,
      [name]: value,
    });

    if (error[name]) {
      setErrors({
        ...error,
        [name]: '',
      });
    }
  }

  function handleChange(e) {
    if (e && e.target) {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: name === 'contact_number' ? parseInt(value) : value,
      });

      if (error[name]) {
        setErrors({
          ...error,
          [name]: '',
        });
      }
    }
  }

  function setChange(name, val) {
    setValues((prevState) => ({
      ...prevState,
      [name]: val,
    }));
    setErrors({
      ...error,
      [name]: '',
    });
  }

  async function uploadMediaHandler(file, name) {
    if (!file) {
      // If the file is null, it means the user clicked the remove button
      setChange(name, null);
      return;
    }

    const response = await uplaodMedia(file);
    if (response.responseCode === 200) {
      Toast.success('Image upload Successfull');

      const data = await response.data;
      setChange(name, data?.url);
    } else {
      Toast.error('Image upload failed');
    }
  }

  return {
    handleChange,
    values,
    error,
    handleCreateMall,
    pageLoading,
    uploadMediaHandler,
    setChange,
    mall_id,
    handleTime,
    navigate,
  };
};

export default useCreateMall;
