import React, { memo } from 'react';
import { ROUTE_PATHS } from '../../router';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { adminActions } from '../../store/slices/adminSlice';
import { removeDevice } from '../../store/slices/deviceSlice';

const AdminItem = ({ id, name, img, price, rating }) => {
  const dispatch = useDispatch();

  const handleRemove = (e) => {
    dispatch(removeDevice(id));
  };
  const handleEdit = () => {
    dispatch(adminActions.setModalVisible(true));
    dispatch(adminActions.setEditingDeviceId(id));
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
          <p>Рейтинг: {rating}</p>
        </div>
        <div className="item-admin__actions">
          <button onClick={handleRemove} className="item-admin__btn btn danger">
            Удалить
          </button>
          <button onClick={handleEdit} className="item-admin__btn btn success">
            Редактировать
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminItem;
