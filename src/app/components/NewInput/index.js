import React, { useRef } from 'react';
// import './index.scss';
import { useEffect } from 'react';
import Toast from '../../utils/Toast';
import './index.scss';
const NewInput = ({
  label,
  onChange,
  placeholder,
  value,
  errorText,
  name,
  type,
  id,
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
  asterisk = false,
  ...props
}) => {
  let cname = 'logonWrapper-text';
  if (className) {
    cname += ' mt1';
  }

  // const MyNumberInput = () => {
  //   const numberInputOnWheelPreventChange = (e) => {
  //     // Prevent the input value change
  //     e.target.blur()

  //     // Prevent the page/container scrolling
  //     e.stopPropagation()

  //     // Refocus immediately, on the next tick (after the current

  //       setTimeout(() => {
  //         e.target.focus()
  //     }, 0)
  // }

  const inputWrapperRef = useRef();
  useEffect(() => {
    // Bind the event listener
    document.addEventListener('wheel', (e) => {
      disableScrolingonNumberInput(e);
    });

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('wheel', (e) => {
        disableScrolingonNumberInput(e);
      });
    };
  }, [inputWrapperRef]);

  const disableScrolingonNumberInput = (event) => {
    if (
      document.activeElement.type === 'number'
      // &&
      // document.activeElement.classList.contains('noscroll')
    ) {
      document.activeElement.blur();
    }
  };
  const handlePaste = (event) => {
    if (max) {
      if (max && event.clipboardData.getData('text').length < max) {
        return event.clipboardData.getData('text');
      } else {
        Toast.error(`Please enter less then ${max} character`);
        event.preventDefault();
        return false;
      }
    }
  };
  return (
    <>
      {!isFieldHidden && (
        <div className={cname}>
          {label && (
            <label className='tooltip-on-hover'>
              {label}
              {asterisk && <span>*</span>}
            </label>
          )}
          {isremove && (
            <label onClick={handleRemove} className='px-3 text-danger'>
              Remove
            </label>
          )}
          <input
            onPaste={handlePaste}
            ref={inputWrapperRef}
            id={id}
            type={type}
            className='form-input'
            placeholder={placeholder}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={handleBlur}
            {...props}
            // onWheel={numberInputOnWheelPreventChange}
            disabled={isDisabled || disabled}
          />
          <div className='tooltip1'>{Tooltiptext ? Tooltiptext : ''}</div>
          {max && showCharacterLength && (
            <small className='f-right'>
              {max - (value ? value.length : 0)}
            </small>
          )}
          {errorText && <p className='loginWrapper-valid-text'>{errorText}</p>}
        </div>
      )}
    </>
  );
};

export default NewInput;
