import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

// Utils

import { getEminitiesList } from '../../../api/eminities';
import { getMallList } from '../../../api/mall';
import {
  addSupportServices,
  getSupportServicesById,
  updateSupportServices,
} from '../../../api/supportservices';
import Message from '../../../utils/Message';
import { convertTo24HourFormat } from '../../../utils/Parsers';
import Toast from '../../../utils/Toast';
import { validate, validationRules } from './validationCheck';

const useCreateMallSupportService = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [pageLoading, setPageLoading] = useState(false);
  const [mallList, setMallList] = useState([]);
  const [eminitiesList, setEminitiesList] = useState([]);

  const [error, setErrors] = useState({});
  const [values, setValues] = useState({
    serviceId: '',
    mallId: '',
    contactNumber: '',
    contactPersonName: '',
    status: false,
  });

  const supportId = location?.state?.id ? location?.state?.id : '';

  useEffect(() => {
    getMallListforDropdown();
    getEminities();
    if (supportId) {
      loadStoreData(supportId);
    }
  }, [supportId]);

  const getMallListforDropdown = async () => {
    setPageLoading(true);
    let response = await getMallList(1);
    setPageLoading(false);
    if (response && response?.responseCode === 200) {
      let temp = await response?.data?.malls?.map((item, index) => {
        return {
          ...item,
          value: item.id,
          label: item.name,
        };
      });
      setMallList(temp);
    } else {
      Toast.error(
        response?.data ? response?.data : Message?.Error?.COMMON_MESSAGE
      );
    }
  };
  console.log('eminitiesList', eminitiesList);
  console.log('mall', mallList);
  const getEminities = async () => {
    setPageLoading(true);
    let response = await getEminitiesList(1);
    setPageLoading(false);
    if (response && response?.responseCode === 200) {
      let temp = await response?.data?.emitites?.map((item, index) => {
        return {
          ...item,
          value: item.id,
          label: item.name,
        };
      });
      setEminitiesList(temp);
    } else {
      Toast.error(
        response?.data ? response?.data : Message?.Error?.COMMON_MESSAGE
      );
    }
  };

  async function loadStoreData(id) {
    if (!id) {
      return;
    }
    // '41060749-282c-4178-9f48-d854dc3ba5f0'
    setPageLoading(true);
    let response = await getSupportServicesById(id);
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

    if (supportId) {
      response = await updateSupportServices(supportId, { ...values });
    } else {
      response = await addSupportServices({ ...values });
    }
    setPageLoading(false);

    if (response?.responseCode === 200) {
      Toast.success(
        supportId
          ? Message.Support_Service.UPDATED_SUCCESS
          : Message.Support_Service.CREATED_SUCCESS
      );
      navigate(-1);
    } else {
      Toast.error(
        response?.error ? response?.error : Message.Error.COMMON_MESSAGE
      );
    }
  }

  function handleCreateMallSupportService(e) {
    e.preventDefault();
    const validationErrors = validate(values, validationRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      callAddOrUpdateAPI();
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

  return {
    setChange,
    handleChange,
    values,
    error,
    handleCreateMallSupportService,
    pageLoading,
    supportId,
    mallList,
    eminitiesList,
    navigate,
  };
};

export default useCreateMallSupportService;
