import React from 'react';
import { ROUTE_PATHS } from '../router';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, registerAction, selectAuth } from '../store/slices/authSlice';
import { useForm } from 'react-hook-form';

const AuthPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isLogin = location.pathname.includes('/login');
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  });

  const { user } = useSelector(selectAuth);

  const onSubmit = (data) => {
    if (isLogin) {
      dispatch(loginAction(data));
    } else {
      dispatch(registerAction(data));
    }
    reset();
  };

  if (user) {
    return <Navigate to={ROUTE_PATHS.ADMIN} />;
  }
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__block">
          <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            {!isLogin && (
              <input //
                {...register('name', {
                  required: true,
                  maxLength: 30,
                })}
                add={'add'}
                className="form__input input"
                type="text"
                placeholder="Имя"
              />
            )}
            <input //
              {...register('login', {
                required: true,
                maxLength: 30,
              })}
              add={'add'}
              className="form__input input"
              type="email"
              placeholder="E-mail"
            />
            <input //
              {...register('password', {
                required: true,
                maxLength: 20,
              })}
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
