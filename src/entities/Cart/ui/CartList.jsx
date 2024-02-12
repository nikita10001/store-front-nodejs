import React from 'react';
import { CartItem } from './CartItem';

export const CartList = ({ items }) => {
  return (
    <div className="list-cart ">
      {!items.length && <h4 className="error-title">Корзина пуста!</h4>}
      {items.map((item) => (
        <CartItem //
          key={item._id}
          id={item._id}
          {...item}
        />
      ))}
    </div>
  );
};
