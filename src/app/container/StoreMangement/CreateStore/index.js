// Components
import HeaderWithBackButton from '../../../components/HeaderWithBackButton';
import DropdownOptions from '../../../utils/DropdownOptions';

import Dropdown from '../../../components/Dropdown';
import NewInput from '../../../components/NewInput';
import PageLoader from '../../../components/PageLoader';
import NumberInput from '../../../components/UI/NumberInput';
import Button from '../../../components/button';

// API

// Constants

import Toggle from 'react-toggle';
import NewAttachment from '../../../components/NewAttachment';
import { APP_CONSTANTS } from '../../../constants/app-constants';
import useCreateStore from './useCreateStore';
import TextArea from '../../../components/Textarea';
import TimePickerComponent from '../../../components/TimePicker';

const CreateStore = () => {
  const {
    storeId,
    mallList,
    categoryList,
    subCategoryList,
    handleSelectSubCategory,
    handleChange,
    values,
    error,
    handleCreateStore,
    pageLoading,
    hideFields,
    uploadMediaHandler,
    setChange,
    navigate,
    handleTime,
  } = useCreateStore();

  return (
    <div className='blogsForm'>
      <div className='blogsForm_content'>
        <HeaderWithBackButton
          title={` ${storeId ? ' Edit Store  ' : 'Create Store'}`}
          goTo={APP_CONSTANTS.STORE}
        />
        <div className='inner-form-wrapper flex justify-between flex-wrap mb-4'>
          <div className='wd-25'>
            <NewInput
              label='Store Name*'
              id='storeName'
              type='text'
              placeholder='Store name'
              name='storeName'
              value={values?.storeName}
              onChange={handleChange}
              errorText={error?.storeName}
            />
          </div>
          <div className='wd-25'>
            <label> Cover Image </label>
            <NewAttachment
              value={values.coverImage}
              id='coverImage'
              onFileSelected={uploadMediaHandler}
              fileType='image'
              label='Choose File'
              className='feed_attachment'
              alt='coverImage'
              errorText={error?.coverImage}
            />
          </div>
          <div className='wd-25'>
            <label> Additional Image </label>
            <NewAttachment
              value={values.additionalImage}
              id='additionalImage'
              onFileSelected={uploadMediaHandler}
              fileType='image'
              label='Choose File'
              className='feed_attachment'
              errorText={error?.additionalImage}
            />
          </div>
          <div className='wd-25'>
            <label> Logo of Store </label>
            <NewAttachment
              value={values.logo}
              id='logo'
              onFileSelected={uploadMediaHandler}
              fileType='image'
              label='Choose File'
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
              label='Location details*'
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
              label='Contact details*'
              id='contactNumber'
              placeholder='Contact Number'
              name='contactNumber'
              value={values.contactNumber}
              errorText={error?.contactNumber}
              onChange={handleChange}
            />
          </div>
          <div className='wd-50'>
            <Dropdown
              id={'mallId'}
              label='Mall name*'
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
              id={'categoryId'}
              label='Store category *'
              name='categoryId'
              options={categoryList}
              placeholder='Select Category'
              value={values?.categoryId ? values?.categoryId : null}
              handleChange={handleSelectSubCategory}
              errorText={error?.categoryId}
            />
          </div>
          <div className='wd-50'>
            <Dropdown
              id={'subCategoryId'}
              label='Store Sub Category*'
              name='subCategoryId'
              options={subCategoryList}
              placeholder='Select Category'
              value={values?.subCategoryId ? values?.subCategoryId : null}
              handleChange={handleChange}
              errorText={error?.subCategoryId}
            />
          </div>
          <div className='wd-50'>
            <Dropdown
              id={'partOfReward'}
              label='Part of Rewards*'
              name='partOfReward'
              options={DropdownOptions?.PartofRewards}
              placeholder='(Default)'
              value={values.partOfReward ? 'yes' : 'no'}
              handleChange={handleChange}
              isFieldHidden={hideFields}
              errorText={error?.partOfReward}
            />
          </div>
          <>
            {/* <div className='cdropdown wd-100'> */}
            <label className='tooltip-on-hover cdropdown wd-100'>
              Manager Details*
            </label>

            <div className='discount_details_box flex justify-between flex-wrap wd-100'>
              <div className='wd-50'>
                <NewInput
                  label='Name*'
                  id='managerDetailsName'
                  type='text'
                  placeholder='Enter Manager Name'
                  name='managerDetailsName'
                  value={values?.managerDetailsName}
                  onChange={handleChange}
                  errorText={error?.managerDetailsName}
                  isFieldHidden={hideFields}
                />
              </div>
              <div className='wd-50'>
                <NumberInput
                  label='Phone Details*'
                  id='managerPhoneNumber'
                  placeholder='Enter Manager Phone Number'
                  name='managerPhoneNumber'
                  value={values.managerPhoneNumber}
                  onChange={handleChange}
                  errorText={error?.managerPhoneNumber}
                />
              </div>
              <div className='wd-50'>
                <NewInput
                  label='Email Details*'
                  id='managerEmail'
                  type='text'
                  placeholder='Enter Manager Email'
                  name='managerEmail'
                  value={values?.managerEmail}
                  onChange={handleChange}
                  errorText={error?.managerEmail}
                  isFieldHidden={hideFields}
                />
              </div>
            </div>
            <div className='wd-100'>
              <label className='tooltip-on-hover'>Timing*</label>
              <div className='date-picker-wrapper flex gap-10'>
                <TimePickerComponent
                  initialTime={values?.storeOpeningTime}
                  onTimeChange={(value) =>
                    handleTime(value, 'storeOpeningTime')
                  }
                  errorText={error?.storeOpeningTime}
                />

                <TimePickerComponent
                  initialTime={values?.storeClosingTime}
                  onTimeChange={(value) =>
                    handleTime(value, 'storeClosingTime')
                  }
                  errorText={error?.storeClosingTime}
                />
              </div>
            </div>
          </>
          <div className='d-block wd-100'>
            <label className='me-2 d-inline-block tooltip-on-hover'>
              Status*
            </label>
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
        <div className='d-flex justify-content-start'>
          <Button
            className='mt1'
            onClick={handleCreateStore}
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

export default CreateStore;
