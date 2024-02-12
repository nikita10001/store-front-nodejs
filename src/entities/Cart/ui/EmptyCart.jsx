import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'shared/config/router';

import emptyCartIcon from 'shared/assets/images/empty.png';

export const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <div className="empty-cart__image">
        <img src={emptyCartIcon} alt="" />
      </div>
      <h3 className="empty-cart__title">Ваша корзина пуста</h3>
      <p className="empty-cart__text">Добавьте товары в корзину покупок и возвращайтесь на эту страницу</p>
      <NavLink to={ROUTE_PATHS.MAIN} className="empty-cart__btn btn">
        Перейти на главную
      </NavLink>
    </div>
  );
};
