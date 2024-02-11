import React from 'react';
import { ReactComponent as PreloaderIcon } from 'shared/assets/icons/preloader.svg';
const Preloader = () => {
  return (
    <div className="page-preloader">
      <PreloaderIcon className="page-preloader__image" />
    </div>
  );
};

export default Preloader;
