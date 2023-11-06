import React from 'react';
import s from './Button.module.scss';
const Button = ({ children, onClick, ...props }) => {
  return (
    <button className={s.btn} onClick={(e) => onClick(e)} {...props}>
      {children}
    </button>
  );
};

export default Button;
