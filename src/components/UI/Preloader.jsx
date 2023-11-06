import React from 'react';
import preloader from '../../assets/preloader.svg';

const Preloader = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <img style={{ maxWidth: '180px' }} src={preloader} alt="" />
    </div>
  );
};

export default Preloader;
