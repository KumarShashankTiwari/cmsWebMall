// TimePickerComponent.jsx
import React, { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';

import './index.scss';

const TimePickerComponent = ({
  initialTime = '',
  onTimeChange,
  errorText = '',
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    setValue(initialTime);
  }, [initialTime]);

  const handleChange = (newTime) => {
    setValue(newTime);
    if (onTimeChange) {
      onTimeChange(newTime);
    }
  };

  return (
    <div>
      <TimePicker
        onChange={handleChange}
        value={value}
        format='h:mm a'
        clockIcon={null}
        clearIcon={null}
        amPmAriaLabel
      />

      {errorText && <p className='loginWrapper'>{errorText}</p>}
    </div>
  );
};

export default TimePickerComponent;
