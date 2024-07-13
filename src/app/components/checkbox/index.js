import React from 'react';
import './index.scss';

const Checkbox = ({ id, label, checked, onChange }) => {
  const handleChange = (e) => {
    onChange && onChange(e);
  };

  return (
    <div className='check'>
      <div className='form-check'>
        <input
          id={id}
          className='form-check-input'
          type='checkbox'
          value=''
          onClick={handleChange}
          checked={checked}
        />
        <label className='form-check-label' htmlFor={id}>
          {label}
        </label>
      </div>
    </div>
  );
};

export default Checkbox;
