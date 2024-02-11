import React from 'react';
import s from './Moda.module.scss';

const Modal = ({ children, visible, setVisible }) => {
  const rootClasses = [s.myModal];
  if (visible) {
    rootClasses.push(s.active);
  }
  return (
    <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
      <div onClick={(e) => e.stopPropagation()} className={s.myModalContent}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
