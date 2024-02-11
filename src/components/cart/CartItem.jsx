import React from 'react';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'shared/config/router';

import { useDispatch } from 'react-redux';
import { cartActions, deleteProductFromCart } from '../../store/slices/cartSlice';

const CartItem = ({ id, name, img, price, rating }) => {
  const dispatch = useDispatch();

  const handleDelete = (e) => {
    dispatch(deleteProductFromCart(id));
  };
  return (
    <div className="list-cart__item item-cart">
      <div className="item-cart__wrapper">
        <div className="item-cart__image">
          <div className="image" style={{ backgroundImage: `url(${img})` }} />
        </div>
        <div className="item-cart__content">
          <NavLink to={ROUTE_PATHS.MAIN + '/' + id}>
            <h2 className="item-cart__title">{name}</h2>
          </NavLink>
          <p>
            Цена: <span>{price} р.</span>
          </p>
        </div>
        <div className="item-cart__actions">
          <button onClick={handleDelete} className="item-cart__delete btn danger">
            X
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
