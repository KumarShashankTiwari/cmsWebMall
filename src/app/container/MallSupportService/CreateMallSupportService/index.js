// Components
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';

import NewInput from '../../../components/NewInput';
import PageLoader from '../../../components/PageLoader';
import NumberInput from '../../../components/UI/NumberInput';
import Button from '../../../components/button';

// API

// Constants

import Toggle from 'react-toggle';
import Dropdown from '../../../components/Dropdown';
import { APP_CONSTANTS } from '../../../constants/app-constants';
import useCreateMallSupportService from './useCreateMallSupportService';

const CreateMallSupportService = () => {
  const {
    handleChange,
    values,
    error,
    handleCreateMallSupportService,
    pageLoading,
    hideFields,
    mallList,
    eminitiesList,
    setChange,
    supportId,
    navigate,
  } = useCreateMallSupportService();

  return (
    <div className='blogsForm'>
      <div className='blogsForm_content'>
        <HeaderWithBackButton
          title={` ${
            supportId ? ' Edit Support Service' : 'Create Support Service'
          }`}
          goTo={APP_CONSTANTS.SUPPORT_SERVICE}
        />
        <div className='inner-form-wrapper flex justify-between flex-wrap mb-4'>
          <div className='wd-50'>
            <Dropdown
              id={'mallId'}
              label='Mall List*'
              name='mallId'
              options={mallList}
              placeholder='Select Mall '
              value={values.mallId}
              handleChange={handleChange}
              isFieldHidden={hideFields}
              errorText={error?.mallId}
            />
          </div>
          <div className='wd-50'>
            <Dropdown
              id={'serviceId'}
              label='Eminities List*'
              name='serviceId'
              options={eminitiesList}
              placeholder='Select Eminities '
              value={values.serviceId}
              handleChange={handleChange}
              isFieldHidden={hideFields}
              errorText={error?.serviceId}
            />
          </div>
          <div className='wd-50'>
            <NewInput
              label='Contact Person*'
              id='contactPersonName'
              type='text'
              placeholder='Contact Person'
              name='contactPersonName'
              value={values?.contactPersonName}
              onChange={handleChange}
              errorText={error?.contactPersonName}
            />
          </div>
          <div className='wd-50'>
            <NumberInput
              label='Contact Number*'
              id='contactNumber'
              placeholder='Contact Number'
              name='contactNumber'
              value={values.contactNumber}
              errorText={error?.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className='wd-50'>
            <div className='d-block my-4'>
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
            className='mt1'
            onClick={handleCreateMallSupportService}
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

export default CreateMallSupportService;
