import React, { useEffect, useRef, useState } from 'react';
import CloseBlackIcon from '../../../assets/images/incorrect.png';
import './index.scss';
import Toast from '../../utils/Toast';

const NewAttachment = ({
  onFileSelected,
  value = null,
  id,
  label,
  className,
  sizevalidationUpto = 10, // sizevalidationUpto is now in MB
  asterisk = false,
  alt = '',
  errorText = '',
  videoAllowed = false,
}) => {
  const fileRef = useRef();
  const [selFile, setSelFile] = useState(null);
  const [isImage, setIsImage] = useState(true);
  const [isValidFile, setIsValidFile] = useState(true);
  const [isRemoteUrl, setIsRemoteUrl] = useState(false);

  useEffect(() => {
    if (value) {
      const isRemote = value.startsWith('http') || value.startsWith('https');
      setIsRemoteUrl(isRemote);

      setSelFile(value);
      const extension = value.split('.').pop().toLowerCase();
      const imageExtensions = ['jpg', 'jpeg', 'png', 'gif'];
      const videoExtensions = ['mp4'];

      if (imageExtensions.includes(extension)) {
        setIsImage(true);
        setIsValidFile(true);
      } else if (videoExtensions.includes(extension)) {
        setIsImage(false);
        setIsValidFile(true);
      } else {
        setIsValidFile(false);
      }
    } else {
      setSelFile(null);
    }
  }, [value]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const validFileTypes = videoAllowed
      ? ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'video/mp4']
      : ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];

    if (!validFileTypes.includes(file.type)) {
      Toast.error('Invalid file type. Please select an image.');
      return;
    }

    if (file.type === 'video/mp4' && !videoAllowed) {
      Toast.error('Video upload is not allowed.');
      return;
    }

    const sizeLimit = sizevalidationUpto * 1024 * 1024; // sizevalidationUpto is in MB
    if (file.size > sizeLimit) {
      Toast.error(`Please select a file up to ${sizevalidationUpto} MB.`);
      return;
    }

    setIsImage(file.type.startsWith('image'));
    setIsValidFile(true);
    setIsRemoteUrl(false); // This is a local file
    setSelFile(file);
    onFileSelected && onFileSelected(file, id, file.type.startsWith('image'));
  };

  const handleRemove = () => {
    setSelFile(null);
    setIsRemoteUrl(false);
    onFileSelected && onFileSelected(null, id, isImage);
    if (fileRef.current) {
      fileRef.current.value = null;
    }
  };

  const handleClick = () => {
    if (!selFile) {
      if (fileRef.current) {
        fileRef.current.click();
      }
    }
  };

  const RenderFile = ({ children }) => (
    <div
      className={`${
        isImage
          ? 'newattachment_img_wrapper'
          : 'newattachment_img_wrapper video'
      }`}
    >
      {children}
      <div className='newattachment_img_wrapper_close'>
        <img
          crossOrigin='anonymous'
          src={CloseBlackIcon}
          alt='Remove'
          onClick={handleRemove}
        />
      </div>
    </div>
  );

  return (
    <>
      <div className='newattachment_container'>
        {!selFile && (
          <>
            <div
              className={`newattachment ${selFile ? 'disabled' : ''}`}
              onClick={handleClick}
            >
              <div className='newattachment_text flex'>
                <span className='label-btn'>
                  {label || 'Add an attachment'}
                </span>
                <span className='newjpgsizelabel'>
                  Upload Cover Image file here
                </span>
                {asterisk && <span className='asterisk'>*</span>}
              </div>
              <input
                ref={fileRef}
                type='file'
                id={id || 'file'}
                accept={
                  videoAllowed
                    ? '.jpg, .jpeg, .png, .gif, .mp4'
                    : '.jpg, .jpeg, .png, .gif'
                }
                className='newattachment__input-file'
                onChange={handleFileChange}
              />
            </div>
            <div className='info-text'>
              {videoAllowed
                ? `File Format: (JPG/JPEG/PNG/MP4) up to ${sizevalidationUpto} MB`
                : `File Format: (JPG/JPEG/PNG) up to ${sizevalidationUpto} MB`}
            </div>
          </>
        )}
        {selFile && isValidFile && (
          <RenderFile>
            {isImage ? (
              <img
                src={isRemoteUrl ? selFile : null}
                alt={alt}
                className={`attachment-media ${className}`}
                crossOrigin='anonymous'
              />
            ) : (
              <video className={`attachment-media ${className}`} controls>
                <source
                  crossOrigin='anonymous'
                  src={isRemoteUrl ? selFile : null}
                  type='video/mp4'
                />
              </video>
            )}
          </RenderFile>
        )}
        {selFile && !isValidFile && (
          <div className='error-message'>Invalid file format.</div>
        )}
      </div>
      {errorText && <p className='loginWrapper-valid-text'>{errorText}</p>}
    </>
  );
};

export default NewAttachment;
