import React from 'react';
import s from './Select.module.scss';

const Select = ({ value, setValue, options, defaultValue }) => {
  return (
    <select className={s.select} value={value} onChange={(e) => setValue(e.target.value)}>
      <option className={s.option} value="" disabled>
        {defaultValue}
      </option>
      {options.map((o) => (
        <option className={s.option} key={o.value} value={o.value}>
          {o.name}
        </option>
      ))}
    </select>
  );
};

export default Select;
