import React, { memo } from 'react';
import cls from './Input.module.scss';
import { classNames } from 'shared/lib/classNames';

export const Input = memo((props) => {
  const {
    value, //
    onChange,
    type = 'text',
    className,
    ...otherProps
  } = props;

  const onChangeHanlder = (e) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={classNames(cls.inputWrapper, {}, [className])}>
      <input //
        className={cls.input}
        onChange={onChangeHanlder}
        value={value}
        type={type}
        {...otherProps}
      />
    </div>
  );
});
