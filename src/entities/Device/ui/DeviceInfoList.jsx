import React from 'react';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';

export const DeviceInfoList = memo(({ list, className }) => {
  const handleRemoveItem = (e) => {
    e.preventDefault();
  };

  return (
    <ul className={classNames('info-device__list', {}, [className])}>
      {list.map(({ _id, name, value }) => (
        <li key={name} className="info-device__item">
          <div className="info-device__label">{name}</div>
          <div className="info-device__text">{value}</div>
          <button onClick={handleRemoveItem} className="item-comment__delete ">
            ×
          </button>
        </li>
      ))}
    </ul>
  );
});
