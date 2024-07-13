import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

// Utils
import { validate, validationRules } from './validationCheck';

import {
  createMallBanner,
  getMallBannerById,
  getMallList,
  updateMallBanner,
  uplaodBannerMedia,
} from '../../../api/mall';
import Message from '../../../utils/Message';
import Toast from '../../../utils/Toast';

const useCreateMallBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mallList, setMallList] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const [error, setErrors] = useState({});
  const [values, setValues] = useState({
    img_type: '',
    mall_id: '',
    sequence: null,
    img_url: '',

    status: false,
  });

  const bannerId = location?.state?.id ? location?.state?.id : '';

  useEffect(() => {
    getMallListforDropdown();
    if (bannerId) {
      loadStoreData(bannerId);
    }
  }, [bannerId]);

  async function loadStoreData(id) {
    if (!id) {
      return;
    }
    // '41060749-282c-4178-9f48-d854dc3ba5f0'
    setPageLoading(true);
    let response = await getMallBannerById(id);
    setPageLoading(false);
    if (response?.responseCode === 200) {
      let responsedata = response?.data;

      setValues(() => ({
        img_type: responsedata?.img_type,
        mall_id: responsedata?.mall_id,
        sequence: responsedata?.sequence,
        img_url: responsedata?.img_url,
        status: responsedata?.status,
      }));
    } else {
      Toast.error(
        response?.data ? response?.data : Message.Error.COMMON_MESSAGE
      );
    }
  }
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

  async function callAddOrUpdateAPI() {
    setPageLoading(true);
    let response = {};

    let senddata = {
      ...values,
      name: values.mallName,
      bannerId: bannerId,
    };

    if (bannerId) {
      response = await updateMallBanner(senddata);
    } else {
      response = await createMallBanner(senddata);
    }
    setPageLoading(false);
    if (response?.responseCode === 200) {
      Toast.success(
        bannerId
          ? Message.MallBanner.UPDATED_SUCCESS
          : Message.MallBanner.CREATED_SUCCESS
      );
      navigate(`/mall-banner`, {
        state: {
          mall_id: values.mall_id,
        },
      });
      //navigate(-1);
    } else {
      Toast.error(
        response?.data ? response?.data : Message.Error.COMMON_MESSAGE
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

  async function uploadMediaHandler(file, name, isImage) {
    if (!file) {
      // If the file is null, it means the user clicked the remove button
      setChange(name, null);
      return;
    }

    const response = await uplaodBannerMedia(file);
    if (response.responseCode === 200) {
      Toast.success(`${isImage ? 'Image' : 'Video'} upload Successfull`);

      const data = await response.data;
      setChange(name, data?.url);
    } else {
      setChange(name, null);
      Toast.error(`${isImage ? 'Image' : 'Video'} upload Failed`);
    }
  }
  function handleChange(e) {
    if (e && e.target) {
      const { name, value } = e.target;
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
  }

  return {
    values,
    error,
    handleCreateMall,
    pageLoading,
    mallList,
    uploadMediaHandler,
    setChange,
    bannerId,
    handleChange,
    navigate,
  };
};

export default useCreateMallBanner;
