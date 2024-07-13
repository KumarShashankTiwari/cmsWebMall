// import Parsers, { ParseTableDateTime } from 'app/utils/Parsers';
import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { confirmAlert } from 'react-confirm-alert';
import {
  deleteSupportServices,
  getSupportServicesList,
} from '../../api/supportservices';
import Message from '../../utils/Message';
import Toast from '../../utils/Toast';
const useMallSupportService = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState('');
  const [data, setData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [pageLoading, setPageLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage, setDataPerPage] = useState(10);
  const [filteredData, setFilteredData] = useState([]);

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  let currentData = filteredData.slice(indexOfFirstData, indexOfLastData);

  useEffect(() => {
    getContentDataHandler(currentPage);
  }, []);

  const getContentDataHandler = async (currentPage) => {
    setPageLoading(true);
    let response = await getSupportServicesList(currentPage);
    //await getCouponAndOffer();

    setPageLoading(false);
    if (response?.responseCode === 200) {
      let dataArr = response?.data?.supportDetail;
      const newArray = dataArr.map((item) => ({
        ...item,
        serviceName: item?.serviceId?.serviceName,
        mallName: item?.mallId?.mallName,
      }));
      setData(newArray);
      setFilteredData(newArray);
      let count = response?.data?.count
        ? response?.data?.count
        : Math.ceil(dataArr.length / dataPerPage);
      setPageCount(count);
    } else {
      Toast.error(
        response?.data ? response?.data : Message.Error.COMMON_MESSAGE
      );
    }
  };

  function paginationHandler(page) {
    setCurrentPage(page);
  }

  function changeHandler(event) {
    const pageLength = event.target.value;
    setDataPerPage(pageLength);
    let count = Math.ceil(data.length / pageLength);
    setPageCount(count);
  }

  function inputChangeHandler(searchVal) {
    if (searchVal.trim() === '') {
      setFilteredData(data); // Reset to original data
      setValues(searchVal?.toLowerCase());
      return;
    }
    const filtered = data?.filter(
      (item) =>
        item?.serviceId?.serviceName
          ?.toLowerCase()
          .includes(searchVal?.toLowerCase()) ||
        item?.mallId?.mallName?.toLowerCase().includes(searchVal?.toLowerCase())
    );
    setFilteredData(filtered);
    setValues(searchVal);
  }

  let pageMeta = {
    total: data,
    pageSize: Number(dataPerPage),
    page: currentPage,
    pageCount: pageCount,
  };

  const callServiePublishOrUnpublishAPI = async (data, value) => {
    setPageLoading(true);
    if (data && data?.id) {
      let responseObj = deleteSupportServices(data?.id);
      setPageLoading(false);
      getContentDataHandler(currentPage);
      if (responseObj?.response?.code === 200) {
        // loadNames();

        Toast.success('Deleted Successfully');

        // setRefresh(!refresh);
      }
    } else {
      Toast.error('Failed to delete');
    }
  };

  const handleDelete = (data) => {
    if (!data.status) {
      return;
    }

    confirmAlert({
      title: '',
      message: `Are you sure you want to Delete ${data?.name} this Mall?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => {
            callServiePublishOrUnpublishAPI(data);
          },
        },
        {
          label: 'No',
        },
      ],
      overlayClassName: 'overlay-custom-class-name',
    });
  };
  // ------------------------------------------------

  return {
    handleDelete,
    values,
    inputChangeHandler,
    changeHandler,
    pageLoading,
    currentData,
    data,
    getContentDataHandler,
    currentPage,
    dataPerPage,
    pageMeta: {
      total: data,
      pageSize: Number(dataPerPage),
      page: currentPage,
      pageCount: Math.ceil(pageMeta?.total.length / pageMeta?.pageSize),
    },
    pageCount,
    paginationHandler,
    navigate,
  };
};

export default useMallSupportService;
