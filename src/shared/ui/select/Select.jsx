import React, { memo } from 'react';
import s from './Select.module.scss';
import { classNames } from 'shared/lib/classNames';

const Select = memo((props) => {
  const { className, value, setValue, options, defaultValue } = props;
  return (
    <select className={classNames(s.select, {}, [className])} value={value} onChange={(e) => setValue(e.target.value)}>
      <option className={s.option} value="" disabled>
        {defaultValue}
      </option>
      {options.map((o) => (
        <option className={s.option} key={o.id} value={o.name}>
          {o.name}
        </option>
      ))}
    </select>
  );
});

export default Select;
