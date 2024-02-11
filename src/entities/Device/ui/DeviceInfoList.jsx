import React from 'react';
import { memo } from 'react';

export const DeviceInfoList = memo(({ list }) => {
  return (
    <ul className="info-device__list">
      {list.map(({ _id, name, value }) => (
        <li key={_id} className="info-device__item">
          <div className="info-device__label">{name}</div>
          <div className="info-device__text">{value}</div>
        </li>
      ))}
    </ul>
  );
});
