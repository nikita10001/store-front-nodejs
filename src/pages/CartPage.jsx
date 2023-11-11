import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsFromCart } from '../store/slices/cartSlice';
import CartList from '../components/cart/CartList';
import EmptyCart from '../components/cart/EmptyCart';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from '../router';
import Order from '../components/Order';
import { selectAuth } from '../store/slices/authSlice';
import Preloader from '../components/UI/Preloader';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, cart } = useSelector((state) => state.cart);

  const [isOrder, setIsOrder] = useState(false);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0));

  // useEffect(() => {
  //   if (user) {
  //     dispatch(getProductsFromCart(user.id));
  //   }
  // }, [user]);

  return (
    <div className="page__cart cart-page">
      <div className="cart-page__container">
        <div className="cart-page__top">
          <h4 className="cart-page__title">Корзина</h4>
          <button onClick={() => navigate(-1)} className="btn outline">
            Вернуться назад
          </button>
        </div>
        <div className="cart-page__wrapper">
          {!cart.length ? (
            isLoading ? (
              <Preloader />
            ) : (
              <EmptyCart />
            )
          ) : (
            <>
              <div className="cart-page__list">
                <CartList items={cart} />
              </div>
              <div className="cart-page__total total-cart">
                <div className="total-cart__price">
                  <h4 className="total-cart__title">ИТОГО</h4>
                  <span>{totalPrice} руб.</span>
                </div>
                <button onClick={() => setIsOrder(true)} className="total-cart__btn btn">
                  Перейти к оформлению
                </button>
              </div>
              {isOrder && <Order />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
