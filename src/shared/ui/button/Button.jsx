import React from 'react';
import s from './Button.module.scss';
const Button = ({ children, onClick, ...props }) => {
  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };
  return (
    <button //
      className={s.btn}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
