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
    <>
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
      {isAuth && !user?.isVerified && (
        <div className="verify-info">
          <div className="verify-info__container">
            <p className="verify-info__text">
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M19.5 12C19.5 16.1421 16.1421 19.5 12 19.5C7.85786 19.5 4.5 16.1421 4.5 12C4.5 7.85786 7.85786 4.5 12 4.5C16.1421 4.5 19.5 7.85786 19.5 12ZM21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM11.25 13.5V8.25H12.75V13.5H11.25ZM11.25 15.75V14.25H12.75V15.75H11.25Z"
                  fill="red"
                />
              </svg>
              <span>Почта не подтверждена</span>
              <button onClick={() => window.location.reload()} className="verify-info__check">
                Проверить
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
