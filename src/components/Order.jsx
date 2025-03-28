import React, { useState } from 'react';
import CreditCard from './creditCard/CreditCard';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions, sendOrderData } from '../store/slices/orderSlice';
import { deleteAllFromCart } from '../store/slices/cartSlice';

const EMPTY_USER = {
  name: '',
  lastName: '',
  phone: '',
  email: '',
};

const Order = ({ setIsOrder }) => {
  const dispatch = useDispatch();

  const { user: currentUser } = useSelector((state) => state.auth);
  const isEmailVerified = currentUser?.isVerified;

  const [isCorrect, setIsCorrect] = useState(false);
  const [user, setUser] = useState(EMPTY_USER);
  const orderData = useSelector((state) => state.order);

  const handleDataSubmit = (e) => {
    e.preventDefault();
    dispatch(orderActions.setUserData(user));
    setIsCorrect(true);
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSendOrder = () => {
    setIsOrder(false);
    dispatch(
      sendOrderData({
        ...orderData,
        userData: {
          ...orderData.userData,
          email: currentUser?.login,
        },
      })
    );
    dispatch(orderActions.resetData());
    dispatch(deleteAllFromCart());
    alert('Проверьте почту');
  };

  return (
    <div className="cart-page__checkout checkout-cart">
      <div className="checkout-cart__wrapper">
        <h3 className="checkout-cart__title">Введите данные получателя заказа</h3>

        <form onSubmit={handleDataSubmit} action="" className="checkout-cart__form form-checkout">
          <div className="form-checkout__row">
            <div className="form-checkout__col">
              <label className="form-checkout__label">
                Имя<span className="required">*</span>
              </label>
              <input //
                value={user.name}
                onChange={handleChange}
                required
                maxLength={100}
                name="name"
                type="text"
                placeholder="Имя"
                className="input"
              />
            </div>
            <div className="form-checkout__col">
              <label className="form-checkout__label">Фамилия</label>
              <input //
                value={user.lastName}
                onChange={handleChange}
                required
                maxLength={100}
                name="lastName"
                type="text"
                placeholder="Фамилия"
                className="input"
              />
            </div>
          </div>
          <div className="form-checkout__row">
            <div className="form-checkout__col">
              <label className="form-checkout__label">
                Номер телефона<span className="required">*</span>
              </label>
              <input
                value={user.number}
                onChange={handleChange}
                pattern="^\+375\d{9}$"
                required
                type="text"
                name="phone"
                placeholder="+375 (__) ___-__-__"
                className="input"
              />
            </div>
            <div className="form-checkout__col">
              <label className="form-checkout__label">Email</label>
              <input //
                value={isEmailVerified ? currentUser?.login : 'Подтвердите почту'}
                disabled
                onChange={handleChange}
                name="email"
                required
                type="email"
                maxLength={120}
                className={isEmailVerified ? 'input' : 'input  not-verify'}
                placeholder="example@mail.ru"
              />
            </div>
          </div>
          <button className="btn success">Перейти к оплате</button>
        </form>
        {isCorrect && isEmailVerified && (
          <>
            <h3 className="checkout-cart__title">Введите данные платежной карты</h3>
            <CreditCard />
          </>
        )}
        {orderData?.cardData && (
          <button style={{ marginTop: 20 }} className="btn success" onClick={handleSendOrder}>
            Подтвердить заказ
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
