import React from 'react';
import s from './Input.module.scss';

const Input = ({ value, setValue, ...props }) => {
  return (
    <div className={s.inputWrapper}>
      <input className={s.input} onChange={(e) => setValue(e.target.value)} value={value} {...props} />
    </div>
  );
};

export default Input;
