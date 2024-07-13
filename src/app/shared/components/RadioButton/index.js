import React from 'react';

import './index.scss';

const RadioButton = ({ id, label, isChecked, value, onSelect, isDisabled = false, ...props }) => {
  return (
    <div className='radio-btn'>
      <input
        {...props}
        id={id}
        className='form-check-input'
        type='radio'
        name={props.name ? props.name : 'inlineRadioOptions'}
        onChange={(e) => {
          onSelect && onSelect(e);
        }}
        value={value}
        checked={isChecked}
        // defaultChecked={isChecked}
        disabled={isDisabled}
      />
      <label
        className='form-check-label'
        // htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default RadioButton;
