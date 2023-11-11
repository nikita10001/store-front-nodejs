import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { ROUTE_PATHS } from '../router';
import { cartActions, getProductsFromCart } from '../store/slices/cartSlice';
import { authActions, selectAuth } from '../store/slices/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const { user, isAuth } = useSelector(selectAuth);
  const { cart } = useSelector((state) => state.cart);
  // useEffect(() => {

  //   dispatch(getProductsFromCart(user.id));
  // }, [cart.length]);
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
        <nav className="header__menu menu">
          <ul className="menu__list">
            <li className="menu__item">
              {isAuth ? (
                <>
                  <NavLink to={ROUTE_PATHS.ADMIN} className="menu__link">
                    {user?.name}
                  </NavLink>
                  <button onClick={logout} style={{ marginLeft: '10px' }} className="btn outline">
                    Выйти
                  </button>
                </>
              ) : (
                <NavLink className="menu__link" to={ROUTE_PATHS.LOGIN}>
                  Войти
                </NavLink>
              )}
            </li>
            <li className="menu__item">
              <NavLink to={ROUTE_PATHS.MAIN} className="menu__link">
                Каталог
              </NavLink>
            </li>
            <li className="menu__item">
              <NavLink to={ROUTE_PATHS.CART} className="menu__link basket-link">
                <span className="basket-link__icon">
                  <svg width="25" height="25" viewBox="0 0 32 34" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4.65214 2.24957H0V0.749573H4.65214C6.00406 0.749573 7.15546 1.73221 7.36796 3.06732L7.99688 7.01882H29.7121C30.8545 7.01882 31.6906 8.09558 31.4076 9.20234L29.5067 16.6364C29.0823 18.2963 27.5869 19.4574 25.8736 19.4574H9.9766L10.3874 22.0383C10.484 22.6452 11.0073 23.0918 11.6218 23.0918H28.203V24.5918H11.6218C10.2699 24.5918 9.11852 23.6092 8.90602 22.2741L5.8866 3.3031C5.79002 2.69623 5.26665 2.24957 4.65214 2.24957ZM9.73786 17.9574H25.8736C26.9016 17.9574 27.7988 17.2607 28.0535 16.2648L29.9543 8.83075C29.9948 8.67264 29.8753 8.51882 29.7121 8.51882H8.23562L9.73786 17.9574Z"
                      fill="black"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M13.5695 31.8258C14.3183 31.8258 15.0189 31.1799 15.0189 30.2656C15.0189 29.3513 14.3183 28.7054 13.5695 28.7054C12.8207 28.7054 12.1201 29.3513 12.1201 30.2656C12.1201 31.1799 12.8207 31.8258 13.5695 31.8258ZM13.5695 33.3258C15.1984 33.3258 16.5189 31.9557 16.5189 30.2656C16.5189 28.5755 15.1984 27.2054 13.5695 27.2054C11.9406 27.2054 10.6201 28.5755 10.6201 30.2656C10.6201 31.9557 11.9406 33.3258 13.5695 33.3258Z"
                      fill="black"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M26.5466 31.8258C27.2954 31.8258 27.996 31.1799 27.996 30.2656C27.996 29.3513 27.2954 28.7054 26.5466 28.7054C25.7977 28.7054 25.0972 29.3513 25.0972 30.2656C25.0972 31.1799 25.7977 31.8258 26.5466 31.8258ZM26.5466 33.3258C28.1755 33.3258 29.496 31.9557 29.496 30.2656C29.496 28.5755 28.1755 27.2054 26.5466 27.2054C24.9177 27.2054 23.5972 28.5755 23.5972 30.2656C23.5972 31.9557 24.9177 33.3258 26.5466 33.3258Z"
                      fill="black"
                    />
                  </svg>
                  <b>{cart.length || 0}</b>
                </span>
                <span className="basket-link__text">Корзина</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
