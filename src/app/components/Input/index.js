import React from 'react';

const Input = ({
  label,
  onChange,
  placeholder,
  text,
  handleKeypress,
  type,
}) => {
  return (
    <div className='logonWrapper-text'>
      <label className='form-txt form-label'>{label}</label>
      <input
        type={type}
        className='form-control'
        placeholder={placeholder}
        onChange={onChange}
        onKeyPress={(e) => handleKeypress(e)}
        autoComplete='true'
        autoFocus
      />
      <p className='loginWrapper-valid-text'>{text}</p>
    </div>
  );
};

export default Input;
