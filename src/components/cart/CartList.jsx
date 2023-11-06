import React from 'react';
import CartItem from './CartItem';

const CartList = ({ items }) => {
  return (
    <div className="list-cart ">
      {!items.length && <h4 className="error-title">Корзина пуста!</h4>}
      {items.map((item) => (
        <CartItem //
          key={item.id}
          {...item}
        />
      ))}
    </div>
  );
};

export default CartList;
