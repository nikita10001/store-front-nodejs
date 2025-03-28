import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from 'shared/config/router';

import { cartActions, getProductsFromCart } from '../../../store/slices/cartSlice';
import { authActions, selectAuth } from '../../../store/slices/authSlice';

import { AdminNav } from 'entities/Admin';

import { VerifyLine } from 'widgets/VerifyLine';

import { ReactComponent as CartIcon } from 'shared/assets/icons/cart-icon.svg';
import { ReactComponent as CatalogIcon } from 'shared/assets/icons/catalog-icon.svg';

export const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector(selectAuth);
  const { cart } = useSelector((state) => state.cart);
  const isAdmin = user?.role === 'admin';
  useEffect(() => {
    if (user) {
      dispatch(getProductsFromCart(user.id));
    }
  }, [user]);

  const logout = () => {
    dispatch(authActions.setLogout());
    dispatch(cartActions.clearCart());
    localStorage.removeItem('token');
  };
  return (
    <>
      <header className="header">
        <div className="header__container">
          <NavLink className="header__logo" to={ROUTE_PATHS.MAIN}>
            <h4 className="logo">1_STORE</h4>
          </NavLink>
          <div className="header__user">
            {isAuth ? (
              <>
                {isAdmin ? (
                  <NavLink to={ROUTE_PATHS.ADMIN} className="menu__link">
                    Админ
                  </NavLink>
                ) : (
                  <span>{user?.name}</span>
                )}
                <button onClick={logout} className="header__logout btn outline">
                  Выйти
                </button>
              </>
            ) : (
              <NavLink className="menu__link" to={ROUTE_PATHS.LOGIN}>
                Войти
              </NavLink>
            )}
          </div>
          <nav className="header__menu menu">
            <ul className="menu__list">
              <li className="menu__item">
                <NavLink to={ROUTE_PATHS.MAIN} className="menu__link link-icon">
                  <CatalogIcon />
                  <span>Каталог</span>
                </NavLink>
              </li>
              <li className="menu__item">
                <NavLink to={ROUTE_PATHS.CART} className="menu__link basket-link">
                  <span className="basket-link__icon">
                    <CartIcon />
                    {!!cart.length && <b>{cart.length}</b>}
                  </span>
                  <span className="basket-link__text">Корзина</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
        <AdminNav isAdmin={isAdmin} />
      </header>
      {isAuth && !user?.isVerified && <VerifyLine />}
    </>
  );
};
