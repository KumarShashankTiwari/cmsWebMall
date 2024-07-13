import React from 'react';

import NewInput from '../../NewInput';

const NumberInput = (props) => {
  const onKeyUp = (e) => {
    // alert(e.target.value.startsWith('0'));
    // if (e.target.value.startsWith('0')) {
    //   e.preventDefault();
    // }
  };

  const onKeyDown = (event) => {
    // if ((e.which !== 8 && e.which !== 0 && e.which < 48) || e.which > 57) {
    //   e.preventDefault();
    // }
    if (event.keyCode === 46 || event.keyCode === 8) {
      // let it happen, don't do anything
    } else {
      // Ensure that it is a number and stop the keypress
      if (event.keyCode !== 9 && (event.keyCode < 48 || event.keyCode > 57)) {
        event.preventDefault();
      } else {
        if (event.target.value.trim() === '') {
          if (event.keyCode === 48) {
            event.preventDefault();
          }
        }
      }
    }
  };

  return (
    <NewInput
      type='number'
      // Tooltiptext={Tooltiptext}
      min='1'
      onKeyUp={onKeyUp}
      onKeyDown={onKeyDown}
      {...props}
    />
  );
};

export default NumberInput;
