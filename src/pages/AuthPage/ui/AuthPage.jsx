import React, { useState } from 'react';
import { ROUTE_PATHS } from 'shared/config/router';
import { NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkEmail, loginAction, registerAction, selectAuth } from '../../../store/slices/authSlice';
import { Input } from 'shared/ui/input/Input';

const MAX_LOGIN_LENGTH = 60;
const MAX_NAME_LENTGH = 15;
const MAX_PASSWORD_LENTGH = 30;

export const AuthPage = () => {
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
    if (data.name.length > MAX_NAME_LENTGH || data.login.length > MAX_LOGIN_LENGTH || data.login.password > MAX_PASSWORD_LENTGH) {
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

  const onChangeUsername = (value) => {
    setData({ ...data, name: value });
  };
  const onChangeLogin = (value) => {
    setData({ ...data, login: value });
  };
  const onChangePassword = (value) => {
    setData({ ...data, password: value });
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
              <Input //
                required
                onChange={onChangeUsername}
                value={data.name}
                maxLength={MAX_NAME_LENTGH}
                className="form__input"
                placeholder="Имя"
              />
            )}
            <Input //
              required
              onChange={onChangeLogin}
              value={data.login}
              maxLength={MAX_LOGIN_LENGTH}
              className="form__input"
              type="email"
              placeholder="E-mail"
            />
            <Input //
              required
              onChange={onChangePassword}
              value={data.password}
              maxLength={MAX_PASSWORD_LENTGH}
              className="form__input"
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
