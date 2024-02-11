import React from 'react';
import { useCallback } from 'react';
import { Rating } from 'react-simple-star-rating';

import { NavLink, useNavigate } from 'react-router-dom';

import { ROUTE_PATHS } from 'shared/config/router';

import { useDispatch, useSelector } from 'react-redux';
import { addProductToCart } from '../store/slices/cartSlice';

import { ReactComponent as CartIcon } from 'shared/assets/icons/cart-icon.svg';
import { ReactComponent as CommentIcon } from 'shared/assets/icons/comment-icon.svg';

import { selectAuth } from '../store/slices/authSlice';

const DeviceItem = React.memo(({ id, name, price, rating, commentsAmount, img, description }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuth } = useSelector(selectAuth);
  const { cart } = useSelector((state) => state.cart);
  const isInCart = cart?.some((item) => item._id === id);
  const handleAddCart = useCallback(() => {
    if (!isAuth) {
      navigate(ROUTE_PATHS.LOGIN);
      return;
    }
    dispatch(addProductToCart(id));
  }, [id]);

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
            <span className="rating__info">{rating.toFixed(1)}</span>
          </div>
          {!!commentsAmount && (
            <div className="rating__info">
              <CommentIcon />
              <span>{commentsAmount}</span>
            </div>
          )}
        </div>
        <div className="device-card__footer">
          <div className="device-card__price">{price} р.</div>
        </div>
        <button disabled={isInCart} onClick={handleAddCart} type="submit" className="device-card__cart btn">
          <CartIcon className={'cart-icon'} />
          <span>{isInCart ? 'Добавлено' : 'В корзину'}</span>
        </button>
      </div>
    </article>
  );
});

export default DeviceItem;
