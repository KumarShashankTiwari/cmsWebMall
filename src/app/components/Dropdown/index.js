import React, { useEffect, useState } from 'react';
import ReactDropdown from 'react-dropdown';

import './index.scss';

const Dropdown = ({
  label,
  placeholder,
  options = [],
  isDisabled = false,
  name,
  value,
  handleChange,
  Tooltiptext,
  id,
  isFieldHidden = false,
  errorText = '',
  ...props
}) => {
  const [optionValue, setOptionValue] = useState(null);

  useEffect(() => {
    if (value) {
      options &&
        options?.forEach((option) => {
          let type = typeof value;
          if (option && value && type === 'number') {
            if (option?.value === value) {
              setOptionValue(option);
            }
            return;
          }

          if (option?.value && value) {
            if (
              String(option.value).toLowerCase() === String(value).toLowerCase()
            ) {
              setOptionValue(option);
            }
          }
        });
    } else {
      setOptionValue(null);
    }
  }, [value, options]);

  return (
    <>
      {!isFieldHidden && (
        <div className='cdropdown'>
          {label && <label className='tooltip-on-hover'>{label}</label>}
          <ReactDropdown
            options={options}
            disabled={isDisabled}
            onChange={(e) => {
              handleChange &&
                handleChange({
                  target: {
                    id: id,
                    name: name,
                    value: e.value,
                  },
                });
              setOptionValue({
                label: e.label,
                value: e.value,
                uuid: e.id,
              });
            }}
            value={optionValue}
            placeholder={placeholder}
            {...props}
          />
          {errorText && <p className='loginWrapper-valid-text'>{errorText}</p>}
          {/* <div className='tooltip1'>{Tooltiptext}</div> */}
        </div>
      )}
    </>
  );
};

export default Dropdown;
