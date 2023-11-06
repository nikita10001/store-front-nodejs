import React from 'react';
import CreditCard from './creditCard/CreditCard';

const Order = () => {
  return (
    <div className="cart-page__checkout checkout-cart">
      <div class="checkout-cart__wrapper">
        <h3 class="checkout-cart__title">Введите данные получателя заказа</h3>
        <form action="" class="checkout-cart__form form-checkout">
          <div class="form-checkout__row">
            <div class="form-checkout__col">
              <label class="form-checkout__label">
                Имя<span class="required">*</span>
              </label>
              <input id="name" type="text" placeholder="Имя" autocomplete="new-password" class="input" />
            </div>
            <div class="form-checkout__col">
              <label class="form-checkout__label">Фамилия</label>
              <input id="lastName" type="text" placeholder="Фамилия" autocomplete="new-password" class="input" />
            </div>
          </div>
          <div class="form-checkout__row">
            <div class="form-checkout__col">
              <label class="form-checkout__label">
                Номер телефона<span class="required">*</span>
              </label>
              <input type="text" id="phone" autocomplete="new-password" placeholder="+375 (__) ___-__-__" class="input" />
            </div>
            <div class="form-checkout__col">
              <label class="form-checkout__label">Email</label>
              <input id="email" type="email" autocomplete="new-password" class="input" />
            </div>
          </div>
        </form>
        <h3 class="checkout-cart__title">Введите данные платежной карты</h3>
        <CreditCard />
      </div>
    </div>
  );
};

export default Order;
