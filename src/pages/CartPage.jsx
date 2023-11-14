import React, { useMemo, useState } from 'react';
import CartList from '../components/cart/CartList';
import EmptyCart from '../components/cart/EmptyCart';
import Order from '../components/Order';
import Preloader from '../components/UI/Preloader';
import PageTop from '../components/PageTop';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../store/slices/orderSlice';

const CartPage = () => {
  const dispatch = useDispatch();
  const { isLoading, cart } = useSelector((state) => state.cart);
  const [isOrder, setIsOrder] = useState(false);
  const totalPrice = useMemo(() => cart.reduce((sum, item) => sum + item.price, 0));
  const handleOrderClick = () => {
    dispatch(orderActions.setProducts(cart));
    dispatch(orderActions.setTotalPrice(totalPrice));
    setIsOrder(true);
  };
  return (
    <div className="page__cart cart-page">
      <div className="cart-page__container">
        <PageTop title={'Корзина'} />
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
                <button onClick={handleOrderClick} className="total-cart__btn btn">
                  Перейти к оформлению
                </button>
              </div>
              {isOrder && <Order setIsOrder={setIsOrder} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
