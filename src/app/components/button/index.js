import React from 'react';
import './index.scss';

export const Button = ({
  name,
  children,
  className,
  onClick = {},
  type,
  isDisabled = false,
  ...props
}) => {
  const btnName = name || children;
  let customClassName = 'button';
  if (className) {
    customClassName += ` ${className}`;
  }

  return (
    <button
      type={type}
      className={customClassName}
      onClick={onClick}
      {...props}
      disabled={isDisabled}
    >
      {btnName}
    </button>
  );
};

export default Button;
