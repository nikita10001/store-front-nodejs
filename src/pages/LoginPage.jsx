import React from 'react';
import { ROUTE_PATHS } from '../router';
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginAction, selectAuth } from '../store/slices/authSlice';
import { useForm } from 'react-hook-form';

const LoginPage = () => {
  const dispatch = useDispatch();
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
    dispatch(loginAction(data));
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
            <input //
              {...register('login', {
                required: true,
              })}
              add={'add'}
              className="form__input input"
              type="text"
              placeholder="Логин"
            />
            <input //
              {...register('password', {
                required: true,
              })}
              className="form__input input"
              type="password"
              placeholder="Пароль"
            />
            <button className="btn btn-primary login__btn">Войти</button>
          </form>
          <div className="auth-bottom">
            Нет аккаунта? <NavLink to={ROUTE_PATHS.REGISTRATION}>Зарегистрироваться</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
