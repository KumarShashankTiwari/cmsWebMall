import React from 'react';
import './index.scss';

const TextArea = ({
  placeholder,
  rows,
  type,
  value,
  id,
  name,
  label,
  errorText,
  asterisk = false,
  onChange,
  handleBlur,
  Tooltiptext,
  className,
  isremove = false,
  handleRemove = {},
  isFieldHidden = false,
  isDisabled = false,
  disabled = false,
  max = null,
  showCharacterLength = false,
  ...props
}) => {
  let cname = 'logonWrapper-text txtarea';
  if (className) {
    cname += ' mt1';
  }
  return (
    <div
      //className='txtarea'
      className={cname}
    >
      {label && (
        <label className='tooltip-on-hover'>
          {label}
          {asterisk && <span>*</span>}
        </label>
      )}
      <textarea
        id={id}
        rows={rows}
        value={value}
        type={type}
        className='form-input'
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        // onPaste={onChange}
        onBlur={handleBlur}
        {...props}
      />
      {errorText && <p className='loginWrapper-valid-text'>{errorText}</p>}
    </div>
  );
};

export default TextArea;
