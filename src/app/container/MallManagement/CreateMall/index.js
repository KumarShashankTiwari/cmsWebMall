// Components
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';

import NewInput from '../../../components/NewInput';
import PageLoader from '../../../components/PageLoader';
import NumberInput from '../../../components/UI/NumberInput';
import Button from '../../../components/button';

// API

// Constants

import Toggle from 'react-toggle';
import NewAttachment from '../../../components/NewAttachment';
import TimePickerComponent from '../../../components/TimePicker';
import { APP_CONSTANTS } from '../../../constants/app-constants';
import useCreateMall from './useCreateMall';
import TextArea from '../../../components/Textarea';

const CreateMall = () => {
  const {
    mall_id,
    handleChange,
    values,
    error,
    handleCreateMall,
    pageLoading,
    hideFields,
    uploadMediaHandler,
    setChange,
    handleTime,
    navigate,
  } = useCreateMall();

  return (
    <div className='blogsForm'>
      <div className='blogsForm_content'>
        <HeaderWithBackButton
          title={` ${mall_id ? ' Edit Mall  ' : 'Create Mall'}`}
          goTo={APP_CONSTANTS.MALL}
        />
        <div className='inner-form-wrapper flex justify-between flex-wrap mb-4'>
          <div className='wd-50'>
            <NewInput
              label='Mall Name*'
              id='mallName'
              type='text'
              placeholder='Mall name'
              name='mallName'
              value={values?.mallName}
              onChange={handleChange}
              errorText={error?.mallName}
            />
          </div>
          <div className='wd-50'>
            <label> Logo Image </label>
            <NewAttachment
              value={values.logo}
              id='logo'
              onFileSelected={uploadMediaHandler}
              fileType='image'
              label='Add Logo Image'
              className='feed_attachment'
              errorText={error?.logo}
            />
          </div>
          <div className='wd-100'>
            <TextArea
              label='Description'
              id='description'
              type='text'
              placeholder='Description'
              name='description'
              value={values?.description}
              onChange={handleChange}
              errorText={error?.description}
            />
          </div>
          <div className='wd-50'>
            <NewInput
              label='City*'
              id='city'
              type='text'
              placeholder='City'
              name='city'
              value={values?.city}
              onChange={handleChange}
              errorText={error?.city}
              isFieldHidden={hideFields}
            />
          </div>
          <div className='wd-50'>
            <NewInput
              label='Address*'
              id='address'
              type='text'
              placeholder='Address'
              name='address'
              value={values?.address}
              onChange={handleChange}
              errorText={error?.address}
              isFieldHidden={hideFields}
            />
          </div>
          <div className='wd-50'>
            <NewInput
              label='Location*'
              id='location'
              type='text'
              placeholder='Location'
              name='location'
              value={values?.location}
              onChange={handleChange}
              errorText={error?.location}
              isFieldHidden={hideFields}
            />
          </div>
          <div className='wd-50'>
            <NumberInput
              label='Contact Number*'
              id='contact_number'
              placeholder='Contact Number'
              name='contact_number'
              value={values.contact_number}
              errorText={error?.contact_number}
              onChange={handleChange}
            />
          </div>
          <div className='wd-100'>
            <div className='date-picker-wrapper flex gap-10'>
              <TimePickerComponent
                initialTime={values?.opening_time}
                onTimeChange={(value) => handleTime(value, 'opening_time')}
                errorText={error?.opening_time}
              />

              <TimePickerComponent
                initialTime={values?.closing_time}
                onTimeChange={(value) => handleTime(value, 'closing_time')}
                errorText={error?.closing_time}
              />
            </div>
          </div>
          <div className='wd-100'>
            <div className='d-block'>
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

export default CreateMall;
