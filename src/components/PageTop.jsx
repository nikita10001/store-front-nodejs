import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageTop = ({ title }) => {
  const navigate = useNavigate();
  return (
    <div className="section-page__top">
      <h4 className="section-page__title">{title}</h4>
      <button onClick={() => navigate(-1)} className="btn outline">
        Вернуться назад
      </button>
    </div>
  );
};

export default PageTop;
