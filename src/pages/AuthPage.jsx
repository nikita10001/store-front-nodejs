import React, { useState } from 'react';
import { ROUTE_PATHS } from '../router';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkEmail, loginAction, registerAction, selectAuth } from '../store/slices/authSlice';

const AuthPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isLogin = location.pathname.includes('/login');

  const { user } = useSelector(selectAuth);

  const [data, setData] = useState({
    name: '',
    login: '',
    password: '',
  });

  const onSubmit = (e) => {
    e.preventDefault();
    if (data.name.length > 15 || data.login.length > 30 || data.login.password > 20) {
      return;
    }
    if (isLogin) {
      dispatch(loginAction(data));
    } else {
      dispatch(registerAction(data));
      navigate(ROUTE_PATHS.CHECKMAIL);
    }
    setData({
      name: '',
      login: '',
      password: '',
    });
  };

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  if (user) {
    return <Navigate to={ROUTE_PATHS.ADMIN} />;
  }
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__block">
          <form className="login__form" onSubmit={onSubmit}>
            {!isLogin && (
              <input //
                onChange={handleChange}
                name="name"
                value={data.name}
                required
                maxLength={15}
                className="form__input input"
                type="text"
                placeholder="Имя"
              />
            )}
            <input //
              required
              onChange={handleChange}
              value={data.login}
              name="login"
              maxLength={30}
              className="form__input input"
              type="email"
              placeholder="E-mail"
            />
            <input //
              required
              onChange={handleChange}
              name="password"
              value={data.password}
              maxLength={20}
              className="form__input input"
              type="password"
              placeholder="Пароль"
            />
            <button className="btn btn-primary login__btn">{isLogin ? 'Войти' : 'Зарегистрироваться'}</button>
          </form>
          <div className="auth-bottom">
            {!isLogin ? (
              <>
                Уже есть аккаунт? <NavLink to={ROUTE_PATHS.LOGIN}>Войти</NavLink>
              </>
            ) : (
              <>
                Нет аккаунта? <NavLink to={ROUTE_PATHS.REGISTRATION}>Зарегистрироваться</NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
