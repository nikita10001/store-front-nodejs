import React from 'react';
import preloader from '../../assets/preloader.svg';

const Preloader = () => {
  return (
    <div className="page-preloader">
      <img className="page-preloader__image" src={preloader} alt="" />
    </div>
  );
};

export default Preloader;
