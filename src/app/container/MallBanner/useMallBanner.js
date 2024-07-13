import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import {
  changeMallBannerOrder,
  deleteMallBanner,
  getMallList,
} from '../../api/mall';
import Message from '../../utils/Message';
import Toast from '../../utils/Toast';

const useMallBanner = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pageLoading, setPageLoading] = useState(false);
  const [mallList, setMallList] = useState([]);
  const [bannerList, setBannerList] = useState([]);
  const [mallId, setMallId] = useState('');

  useEffect(() => {
    // Check if mall_id is available in location.state
    if (location.state && location.state.mall_id) {
      setMallId(location.state.mall_id);
      loadBannerList(location.state.mall_id);
    } else {
      // Clean up if mall_id is not available
      setMallId('');
      setBannerList([]);
    }
  }, [location.state]);

  useEffect(() => {
    // Load mall list on component mount
    getMallListforDropdown();
  }, []);

  const getMallListforDropdown = async () => {
    setPageLoading(true);
    try {
      const response = await getMallList(1); // Adjust parameters as needed
      setPageLoading(false);
      if (response?.responseCode === 200) {
        const temp = response.data.malls.map((item) => ({
          ...item,
          value: item.id,
          label: item.name,
        }));
        setMallList(temp);
      } else {
        Toast.error(
          response?.data ? response.data : Message.Error.COMMON_MESSAGE
        );
      }
    } catch (error) {
      console.error('Error fetching mall list:', error);
      Toast.error(Message.Error.COMMON_MESSAGE);
      setPageLoading(false);
    }
  };

  const loadBannerList = async (mallId) => {
    setPageLoading(true);
    try {
      // Fetch banner list based on mallId
      const selectedMall = mallList.find((item) => item.id === mallId);
      setBannerList(selectedMall?.banner || []);
    } catch (error) {
      console.error('Error loading banner list:', error);
      Toast.error('Failed to load banner list');
    } finally {
      setPageLoading(false);
    }
  };

  const bannerOrder = async (tempData) => {
    const ServiceData = tempData.map((data, index) => ({
      id: data.original.id,
      sequence: index + 1,
    }));
    setPageLoading(true);
    try {
      await changeMallBannerOrder(ServiceData);
      Toast.success('Banner order updated successfully');
    } catch (error) {
      console.error('Error updating banner order:', error);
      Toast.error('Failed to update banner order');
    } finally {
      setPageLoading(false);
    }
  };

  const callServiceDeleteBanner = async (bannerId) => {
    setPageLoading(true);
    try {
      const response = await deleteMallBanner(bannerId); // Adjust parameters as needed
      if (response?.responseCode === 200) {
        Toast.success('Banner deleted successfully');
        setBannerList((prevList) =>
          prevList.filter((banner) => banner.id !== bannerId)
        ); // Update local banner list
      } else {
        Toast.error(response?.data ? response.data : 'Failed to delete banner');
      }
    } catch (error) {
      console.error('Error deleting banner:', error);
      Toast.error('Failed to delete banner');
    } finally {
      setPageLoading(false);
    }
  };

  const handleDelete = (bannerId) => {
    confirmAlert({
      title: '',
      message: 'Are you sure you want to delete this banner?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => callServiceDeleteBanner(bannerId.id),
        },
        {
          label: 'No',
        },
      ],
      overlayClassName: 'overlay-custom-class-name',
    });
  };

  const handleSelect = async (e) => {
    if (e && e.target) {
      const selectedMallId = e.target.value;
      setMallId(selectedMallId);
      loadBannerList(selectedMallId);
    }
  };

  return {
    handleDelete,
    mallList,
    pageLoading,
    handleSelect,
    bannerList,
    bannerOrder,
    navigate,
  };
};

export default useMallBanner;
