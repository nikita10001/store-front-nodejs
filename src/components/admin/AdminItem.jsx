import React, { memo } from 'react';

import { ROUTE_PATHS } from 'shared/config/router';

import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeDevice } from '../../store/slices/deviceSlice';

const AdminItem = ({ id, name, img, price, rating }) => {
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    dispatch(removeDevice(id));
  };
  return (
    <div className="admin__item item-admin">
      <div className="item-admin__wrapper">
        <div className="item-admin__image">
          <img src={img} alt="" />
        </div>
        <div className="item-admin__content">
          <NavLink to={ROUTE_PATHS.MAIN + '/' + id}>
            <h2 className="item-admin__title">{name}</h2>
          </NavLink>
          <p>Цена: {price} р.</p>
          <p>Рейтинг: {rating.toFixed(1)}</p>
        </div>
        <div className="item-admin__actions">
          <button onClick={handleRemove} className="item-admin__btn btn danger">
            Удалить
          </button>
          <NavLink to={`edit/${id}`} className="item-admin__btn btn success">
            Редактировать
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminItem;
