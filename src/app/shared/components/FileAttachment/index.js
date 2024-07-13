import React, { useState, useRef, useEffect } from 'react';

// Constants
import { CloseBlackIcon, AttachmentIcon } from 'constants/image-constants';

const FileAttachment = ({
  label,
  id,
  fileFormat,
  onFileSelected,
  value,
  isRemoveAttachment,
}) => {
  const inputRef = useRef();
  const [selImage, setSelImage] = useState(value);

  useEffect(() => {
    if (value) {
      setSelImage(value);
    }
  }, [value]);

  const handleAttachmentClick = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.click && inputRef.current.click();
    }
  };

  const handleFilePicker = async (event) => {
    if (event.target.files && event.target.files[0]) {
      const imageFile = event.target.files[0];
      if (
        imageFile.type === 'image/png' ||
        imageFile.type === 'image/jpeg' ||
        imageFile.type === 'image/jpg' ||
        imageFile.type === 'image/gif'
      ) {
        onFileSelected && onFileSelected(imageFile, id);
        var reader = new FileReader();
        reader.onloadend = function () {
          // console.log('RESULT', reader.result);
          setSelImage(reader.result);
        };
        reader.readAsDataURL(imageFile);
      }
    }
  };

  const handleRemove = () => {
    if (!isRemoveAttachment) return;

    setSelImage(null);
    onFileSelected && onFileSelected(null, id);
  };

  const RenderImage = ({ children }) => {
    let showClose = true;
    if (isRemoveAttachment === false) {
      showClose = false;
    }

    return (
      <div className='attachment_img_wrapper'>
        {children}
        {showClose && (
          <div className='attachment_img_wrapper_close'>
            <img src={CloseBlackIcon} alt='Remove' onClick={handleRemove} />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className='attachment'>
      <img src={AttachmentIcon} alt='Add Attachment' width='25' height='25' />
      <p className='attachment_text' onClick={handleAttachmentClick}>
        {label ? label : 'Add an attachment'}
      </p>
      <input
        ref={inputRef}
        type='file'
        id={id ? id : 'file'}
        accept={fileFormat}
        className='attachment__input-file'
        onChange={handleFilePicker}
      />
      {selImage && (
        <RenderImage>
          <img src={selImage} alt='sample' className='attachment__selimage' />
        </RenderImage>
      )}
    </div>
  );
};

export default FileAttachment;
