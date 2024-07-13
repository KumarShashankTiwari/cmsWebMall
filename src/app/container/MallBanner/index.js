import Button from '../../components/button';
import './index.scss';

import DraggableTable from '../../components/DraggableTable';
import PageLoader from '../../components/PageLoader';
import { APP_CONSTANTS } from '../../constants/app-constants';
import { BannerHeader } from '../../constants/table-header-constants';
import useMallBanner from './useMallBanner';
import Dropdown from '../../components/Dropdown';
import AddUser from '../../../assets/images/ic-users-add.svg';
const MallBanner = () => {
  const {
    handleSelect,
    pageLoading,
    mallList,
    navigate,
    bannerList,
    handleDelete,
    bannerOrder,
    mallId,
  } = useMallBanner();

  const menuActionObj = (data) => {
    navigate(`/mall-banner/edit/:${data.id}`, {
      state: {
        ...data,
      },
    });
  };

  const sectionObj = {
    sectionTitle: 'Breathfree Service Bottom Navigation',
  };

  return (
    <>
      <div className='cms-content__container'>
        <h4>Mall Banner Management</h4>
        <div className='content-container__actionBox'>
          <div className='content-container__filterSearch'>
            <Dropdown
              id={'mallId'}
              label='Select Mall*'
              name='mallId'
              options={mallList}
              placeholder='Select Mall '
              value={mallId && mallId}
              handleChange={handleSelect}
              //  isFieldHidden={hideFields}
              //errorText={error?.mallId}
            />
          </div>
          <Button
            onClick={() => navigate(`${APP_CONSTANTS.CREATE_MALL_BANNER}`)}
            className='content-container__filter-btn'
          >
            <img
              src={AddUser}
              alt='Add user'
              width='25'
              height='25'
              className='mr-5'
            />
            {`${APP_CONSTANTS.CREATE_MALL_BANNER_TAG}`}
          </Button>
        </div>
        {bannerList && bannerList.length > 0 && (
          <label className='tool-tip'>Banner List</label>
        )}
        <div className='table-wrapper'>
          <DraggableTable
            sectionObj={sectionObj}
            tableHeader={BannerHeader}
            menuAction={menuActionObj}
            handleDelete={handleDelete}
            HomePageOrder={bannerOrder}
            getData={bannerList}
            hasPagination={false}
          />
        </div>
      </div>
      {pageLoading === true && <PageLoader pageLoading={pageLoading} />}
    </>
  );
};

export default MallBanner;
