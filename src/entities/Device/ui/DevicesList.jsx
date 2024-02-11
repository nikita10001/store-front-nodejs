import React from 'react';
import { DeviceItem } from './DeviceItem';

export const DevicesList = ({ devices }) => {
  if (!devices?.length) {
    return <h4 className="error-title">Устройств нет!</h4>;
  }
  return (
    <div className="devices">
      <div className="devices__wrapper">
        {devices.map((device) => (
          <DeviceItem key={device._id} id={device._id} {...device} />
        ))}
      </div>
    </div>
  );
};
