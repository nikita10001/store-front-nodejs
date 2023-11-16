import React, { useState } from 'react';
import CreditCard from './creditCard/CreditCard';
import { useDispatch, useSelector } from 'react-redux';
import { checkConfirm, confirmEmail, orderActions, sendOrderData } from '../store/slices/orderSlice';
import { checkAuth } from '../store/slices/authSlice';

const EMPTY_USER = {
  name: 'Никита',
  lastName: 'Никита',
  phone: '+375445546559',
  email: 'n_ryabtsev1@mail.ru',
};

const Order = ({ setIsOrder }) => {
  const dispatch = useDispatch();

  const { user: savedUser } = useSelector((state) => state.auth);

  const [isCorrect, setIsCorrect] = useState(false);
  const [user, setUser] = useState(EMPTY_USER);
  const { isOk, isEmailConfirmed, ...orderData } = useSelector((state) => state.order);
  const [isOpen, setIsOpen] = useState(false);

  const [finalOpen, setFinalOpen] = useState(false);
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
    dispatch(sendOrderData(orderData));
  };

  const handleConfirmMail = () => {
    dispatch(
      confirmEmail({
        email: user.email,
        id: savedUser.id,
      })
    );
    alert('Проверьте почту!');
    setIsOpen(true);
  };
  const handleCheckConfirm = () => {
    console.log('isEmailConf', isEmailConfirmed);
    if (isEmailConfirmed) setFinalOpen(true);
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
                value={user.email}
                onChange={handleChange}
                name="email"
                required
                type="email"
                maxLength={120}
                className="input"
                placeholder="example@mail.ru"
              />
            </div>
          </div>
          <button className="btn success">Перейти к оплате</button>
        </form>
        {isCorrect && (
          <>
            <h3 className="checkout-cart__title">Введите данные платежной карты</h3>
            <CreditCard />
          </>
        )}
        {!!isOk &&
          (!isOpen ? (
            <button style={{ marginTop: 20 }} className="btn success" onClick={handleConfirmMail}>
              Подтвердить адресс электронной почты
            </button>
          ) : (
            <button style={{ marginTop: 20 }} className="btn success" onClick={handleCheckConfirm}>
              Проверить подтверждение
            </button>
          ))}
        {finalOpen && (
          <button style={{ marginTop: 20 }} className="btn success" onClick={handleSendOrder}>
            Подтвердить заказ
          </button>
        )}
      </div>
    </div>
  );
};

export default Order;
