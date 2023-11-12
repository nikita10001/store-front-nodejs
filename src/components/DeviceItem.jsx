import React from 'react';
import { Rating } from 'react-simple-star-rating';

import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from '../router';
import { useDispatch } from 'react-redux';
import { addProductToCart } from '../store/slices/cartSlice';
import CartIcon from './icons/CartIcon';
const DeviceItem = ({ id, name, price, rating, img, description }) => {
  const dispatch = useDispatch();
  const handleAddCart = (e) => {
    dispatch(addProductToCart(id));
  };

  return (
    <article className="devices__card device-card">
      <NavLink to={ROUTE_PATHS.MAIN + '/' + id} className="device-card__image">
        <span className="device-card__item-image-ibg device-card__item-image-ibg_contain">
          <img src={img} alt="Картинка" />
        </span>
      </NavLink>
      <div className="device-card__body">
        <h4 className="device-card__title">
          <NavLink to={ROUTE_PATHS.MAIN + '/' + id} className="device-card__link-title">
            {name}
          </NavLink>
        </h4>
        <div className="device-card__rating rating">
          <div className="rating__value">
            <Rating size="15" readonly allowFraction initialValue={rating} />
            <span className="rating__info">{rating}</span>
          </div>
          {/* <div className="rating__info">12 отзывов</div> */}
        </div>
        <div className="device-card__footer">
          <div className="device-card__price">{price} р.</div>
        </div>
        <button onClick={handleAddCart} type="submit" className="device-card__cart btn">
          <CartIcon />
          <span> В коризину</span>
        </button>
      </div>
    </article>
  );
};

export default DeviceItem;
