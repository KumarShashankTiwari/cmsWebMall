import React, { useEffect, useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

const DateTime = ({ value, onChange, minDate }) => {
  const [val, setVal] = useState(value);

  useEffect(() => {
    if (value) {
      // setVal(new Date(value));
      setVal(moment(value).toDate());
    }
  }, [value]);

  const handleChange = (e) => {
    setVal(e);
    let dateTime = e ? moment(e) : '';
    onChange && onChange(dateTime);
  };

  return (
    <div className="Sample calander-box">
      <div className="Sample__container">
        <main className="Sample__container__content">
          <DateTimePicker
            amPmAriaLabel="Select AM/PM"
            calendarAriaLabel="Toggle calendar"
            clearAriaLabel="Clear value"
            dayAriaLabel="Day"
            hourAriaLabel="Hour"
            // maxDetail='second'
            minuteAriaLabel="Minute"
            monthAriaLabel="Month"
            nativeInputAriaLabel="Date and time"
            onChange={handleChange}
            secondAriaLabel="Second"
            value={val}
            yearAriaLabel="Year"
            dayPlaceholder="dd"
            monthPlaceholder="mm"
            yearPlaceholder="yyyy"
            hourPlaceholder="hh"
            minutePlaceholder="mm"
            // secondPlaceholder='ss'
            disableClock={false}
            format={'dd-MM-yyyy hh:mm a'}
            minDate={minDate?minDate:null}
            // locale={'de-DE'}
          />
        </main>
      </div>
    </div>
  );
};

export default DateTime;
