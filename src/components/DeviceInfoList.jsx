import React from 'react';

const DeviceInfoList = ({ list }) => {
  return (
    <ul className="info-device__list">
      {list.map((item) => (
        <li className="info-device__item">
          <div className="info-device__label">{item.label}</div>
          <div className="info-device__text">{item.text}</div>
        </li>
      ))}
    </ul>
  );
};

export default DeviceInfoList;
