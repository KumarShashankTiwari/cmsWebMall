import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';

// Utils

import { getCategoryList } from '../../../api/category';
import { getMallList } from '../../../api/mall';
import {
  addStore,
  getStoreById,
  updateStore,
  uplaodMedia,
} from '../../../api/store';
import Message from '../../../utils/Message';
import Toast from '../../../utils/Toast';
import { validate, validationRules } from './validationCheck';
import {
  convertTo12HourFormat,
  convertTo24HourFormat,
} from '../../../utils/Parsers';

const useCreateStore = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [mallList, setMallList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [subCategoryList, setSubCategoryList] = useState([]);
  const [pageLoading, setPageLoading] = useState(false);

  const [error, setErrors] = useState({});
  const [values, setValues] = useState({
    storeName: '',
    description: '',
    location: '',
    contactNumber: '',
    mallId: null,
    categoryId: null,
    subCategoryId: null,
    partOfReward: 'yes',
    managerDetailsName: '',
    managerPhoneNumber: '',
    managerEmail: '',
    coverImage: null,
    additionalImage: null,
    logo: null,
    status: false,
    storeOpeningTime: '10:00',
    storeClosingTime: '17:00',
  });

  const storeId = location?.state?.id ? location?.state?.id : '';

  useEffect(() => {
    getMallListforDropdown();
    getCategoryListforDropdown();
  }, []);

  useEffect(() => {
    if (categoryList.length > 0 && storeId) {
      loadStoreData(storeId);
    }
  }, [categoryList]);

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
  const getCategoryListforDropdown = async () => {
    setPageLoading(true);
    let response = await getCategoryList();
    setPageLoading(false);
    if (response && response?.responseCode === 200) {
      let temp = await response?.data?.map((item, index) => {
        return {
          ...item,
          value: item.id,
          label: item.name,
        };
      });
      setCategoryList(temp);
    } else {
      Toast.error(
        response?.data ? response?.data : Message?.Error?.COMMON_MESSAGE
      );
    }
  };
  const loadStoreData = async (id) => {
    if (!id) {
      return;
    }
    // '41060749-282c-4178-9f48-d854dc3ba5f0'
    setPageLoading(true);
    let response = await getStoreById(id);
    setPageLoading(false);
    if (response?.responseCode === 200) {
      let responsedata = response?.data;
      setValues((prevState) => ({
        ...prevState,
        ...responsedata,
        partOfReward: responsedata?.partOfReward ? 'yes' : 'no',
        managerDetailsName: responsedata?.managerDetails?.name,
        managerPhoneNumber: responsedata?.managerDetails?.phoneNumber,
        managerEmail: responsedata?.managerDetails?.email,
        categoryId: responsedata?.parentId,
        subCategoryId: parseInt(responsedata?.categoryId),
        storeOpeningTime:
          responsedata?.storeOpeningTime &&
          convertTo24HourFormat(responsedata?.storeOpeningTime),
        storeClosingTime:
          responsedata?.storeClosingTime &&
          convertTo24HourFormat(responsedata?.storeClosingTime),
      }));

      const selectedCategory = categoryList?.find(
        (item) => item?.id === responsedata?.parentId
      );
      if (selectedCategory) {
        const formattedSubCategories = selectedCategory?.subCategories?.map(
          (subCategory) => ({
            label: subCategory.name,
            value: subCategory.id,
            ...subCategory,
          })
        );

        setSubCategoryList([...formattedSubCategories]);
      } else {
        setSubCategoryList([]);
      }
    } else {
      Toast.error(
        response?.data ? response?.data : Message.Error.COMMON_MESSAGE
      );
    }
  };

  const callAddOrUpdateAPI = async () => {
    setPageLoading(true);
    let response = {};

    let senddata = {
      ...values,
      parentId: values.categoryId,
      categoryId: values?.subCategoryId,
      storeOpeningTime: convertTo12HourFormat(values.storeOpeningTime),
      storeClosingTime: convertTo12HourFormat(values.storeClosingTime),
      managerDetails: {
        name: values.managerDetailsName,
        email: values.managerEmail,
        phoneNumber: values.managerPhoneNumber,
      },
    };
    delete senddata?.subCategoryId;
    delete senddata?.managerDetailsName;
    delete senddata?.managerEmail;
    delete senddata?.managerPhoneNumber;
    delete senddata?.parentId;

    if (storeId) {
      response = await updateStore(storeId, { ...senddata });
    } else {
      response = await addStore({ ...senddata });
    }
    setPageLoading(false);
    if (response?.responseCode === 200) {
      Toast.success(
        storeId
          ? Message.Stores.UPDATED_SUCCESS
          : Message.Stores.CREATED_SUCCESS
      );
      navigate(-1);
    } else {
      Toast.error(
        response?.data ? response?.data : Message.Error.COMMON_MESSAGE
      );
    }
  };

  const handleCreateStore = (e) => {
    e.preventDefault();
    const validationErrors = validate(values, validationRules);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      callAddOrUpdateAPI();
    }
  };

  const resetValues = () => {
    setValues({
      id: '',
      code: '',
      storeName: '',
      description: '',
      product_type: '',
      max_usage_per_user: 1,
      discount: null,
      min_value_required: null,
      max_discount_amount: null,
      status: false,
      product_family: '',
    });
  };

  const handleChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setValues({
        ...values,
        [name]:
          name === 'contactNumber' || name === 'phoneNumber'
            ? parseInt(value)
            : value,
      });

      if (error[name]) {
        setErrors({
          ...error,
          [name]: '',
        });
      }
    }
  };

  const handleSelectSubCategory = (e) => {
    if (e && e.target) {
      setSubCategoryList([]);

      const { name, value } = e.target;
      setValues({
        ...values,
        [name]: value,
        subCategoryId: null,
      });
      if (error[name]) {
        setErrors({
          ...error,
          [name]: '',
          subCategoryId: '',
        });
      }
      const selectedSubCategory = categoryList.find(
        (item) => item.id === value
      );
      if (selectedSubCategory) {
        const formattedSubCategories = selectedSubCategory.subCategories.map(
          (subCategory) => ({
            label: subCategory.name,
            value: subCategory.id,
            ...subCategory,
          })
        );
        setSubCategoryList(formattedSubCategories);
      } else {
        setSubCategoryList([]);
      }
    }
  };

  const setChange = (name, val) => {
    setValues((prevState) => ({
      ...prevState,
      [name]: val,
    }));
    setErrors({
      ...error,
      [name]: '',
    });
  };

  const uploadMediaHandler = async (file, name) => {
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
  };
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
  return {
    mallList,
    categoryList,
    subCategoryList,
    resetValues,
    handleChange,
    values,
    error,
    setValues,
    handleCreateStore,
    pageLoading,
    handleSelectSubCategory,
    storeId,
    uploadMediaHandler,
    navigate,
    setChange,
    handleTime,
  };
};

export default useCreateStore;
