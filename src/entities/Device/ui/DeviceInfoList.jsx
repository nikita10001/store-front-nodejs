import React from 'react';
import { memo } from 'react';
import { classNames } from 'shared/lib/classNames';

export const DeviceInfoList = memo((props) => {
  const { isEdit = false, list, className, handleRemoveItem } = props;

  return (
    <ul className={classNames('info-device__list', {}, [className])}>
      {list.map(({ _id, name, value }) => (
        <li key={name} className="info-device__item">
          <div className="info-device__label">{name}</div>
          <div className="info-device__text">{value}</div>
          {isEdit && (
            <button
              onClick={(e) => {
                e.preventDefault();
                handleRemoveItem(name);
              }}
              className="item-comment__delete "
            >
              ×
            </button>
          )}
        </li>
      ))}
    </ul>
  );
});
