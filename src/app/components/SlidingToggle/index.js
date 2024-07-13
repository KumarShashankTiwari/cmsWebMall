import React, { useState } from 'react';
import './index.scss';

export const SlidingToggle = ({selectedSlide,secondarySlide,slideCheck,handleSlideChange}) => {
  return (
    <div className='tab-switch'>
      <label>
      <input 
        type='checkbox' 
        checked={slideCheck}
        onChange={handleSlideChange}
      />
        <span> {selectedSlide}</span>
        <span> {secondarySlide}</span>
      </label>      
  </div>
  );
};

export default SlidingToggle;
