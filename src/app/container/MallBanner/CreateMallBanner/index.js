// Components
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';

import PageLoader from '../../../components/PageLoader';
import Button from '../../../components/button';

// API

// Constants

import Toggle from 'react-toggle';
import Dropdown from '../../../components/Dropdown';
import NewAttachment from '../../../components/NewAttachment';
import { APP_CONSTANTS } from '../../../constants/app-constants';
import useCreateMallBanner from './useCreateMallBanner';

const CreateMallBanner = () => {
  const {
    mallList,
    bannerId,
    handleChange,
    values,
    error,
    handleCreateMall,
    pageLoading,
    hideFields,
    uploadMediaHandler,
    setChange,
    navigate,
  } = useCreateMallBanner();

  return (
    <div className='blogsForm'>
      <div className='blogsForm_content'>
        <HeaderWithBackButton
          title={` ${bannerId ? ' Edit Mall Banner  ' : 'Create Mall Banner'}`}
          goTo={APP_CONSTANTS.MALL_BANNER}
        />
        <div className='inner-form-wrapper flex justify-between flex-wrap mb-4'>
          <div className='wd-50'>
            <Dropdown
              id={'mall_id'}
              label='Mall List*'
              name='mall_id'
              options={mallList}
              placeholder='Select Mall '
              value={values.mall_id}
              handleChange={handleChange}
              isFieldHidden={hideFields}
              errorText={error?.mall_id}
            />
          </div>
          <div className='wd-50'>
            <Dropdown
              id={'img_type'}
              label='Banner Type*'
              name='img_type'
              options={[
                { label: 'Main Banner', value: 'mainBanner' },
                { label: 'Brand Banner', value: 'brandBanner' },
              ]}
              placeholder='Select Mall '
              value={values.img_type}
              handleChange={handleChange}
              isFieldHidden={hideFields}
              errorText={error?.img_type}
            />
          </div>
          <div className='wd-50'>
            <label> Caroal Image/ Video </label>
            <NewAttachment
              value={values?.img_url}
              id='img_url'
              onFileSelected={uploadMediaHandler}
              fileType='image'
              label='Add Logo Image'
              errorText={error?.img_url}
              // sizevalidationUpto={2500}
              videoAllowed={true}
            />
          </div>
          <div className='wd-100'>
            <div className='d-block mt-3'>
              <span className='me-2 d-inline-block'>Status*</span>
              <label className='d-inline-block mt-2'>
                <div className='d-inline-flex align-items-center'>
                  <div className='d-inline-flex text-danger'>OFF</div>
                  <div className='d-inline-flex mx-2'>
                    <Toggle
                      checked={values.status}
                      icons={false}
                      onChange={() => setChange('status', !values.status)}
                    />
                  </div>
                  <div className='d-inline-flex text-green'>ON</div>
                </div>
              </label>
            </div>
          </div>
        </div>
        <div className='d-flex justify-content-start'>
          <Button
            className=''
            onClick={handleCreateMall}
            variant='Save'
            name='Submit'
            isDisabled={pageLoading ? true : false}
          />
          <Button
            className='mt1 cancel-button ms-2'
            onClick={() => navigate(-1)}
            variant='Cancel'
            name='Cancel'
            isDisabled={pageLoading ? true : false}
          />
        </div>
      </div>
      {pageLoading && <PageLoader pageLoading={pageLoading} />}
    </div>
  );
};

export default CreateMallBanner;
