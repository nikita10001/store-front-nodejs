import React from 'react';
import Sceleton from './Sceleton';

const DevicesSceleton = ({ isLoading }) => {
  return isLoading && [...Array(6)].map((i) => <Sceleton key={i} />);
};

export default DevicesSceleton;
