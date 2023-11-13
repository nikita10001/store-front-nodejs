import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from '../router';
import { cartActions, getProductsFromCart } from '../store/slices/cartSlice';
import { authActions, selectAuth } from '../store/slices/authSlice';
import CartIcon from './icons/CartIcon';

const Header = () => {
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
    <header className="header">
      <div className="header__container">
        <NavLink to={ROUTE_PATHS.MAIN}>
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

              <button onClick={logout} style={{ marginLeft: '10px' }} className="btn outline">
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
              <NavLink to={ROUTE_PATHS.MAIN} className="menu__link">
                Каталог
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to={ROUTE_PATHS.CART} className="menu__link basket-link">
                <span className="basket-link__icon">
                  <CartIcon fill={'#000'} />
                  <b>{cart.length || 0}</b>
                </span>
                <span className="basket-link__text">Корзина</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      {/* вынести в компоненту */}
      {isAdmin && (
        <div className="header__admin admin-nav">
          <div className="admin-nav__container">
            <ul className="admin-nav__menu">
              <li className="admin-nav__item">
                <NavLink to={ROUTE_PATHS.ADMIN_COMMENTS} className="admin-nav__link">
                  Комментарии
                </NavLink>
              </li>
              <li className="admin-nav__item">
                <NavLink to={ROUTE_PATHS.ADMIN} className="admin-nav__link">
                  Товары
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
