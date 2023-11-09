import React from 'react';
import { ROUTE_PATHS } from '../router';
import { NavLink, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerAction, selectAuth } from '../store/slices/authSlice';
import { useForm } from 'react-hook-form';
const RegistrationPage = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const { isAuth, error } = useSelector(selectAuth);

  const onSubmit = (data) => {
    dispatch(registerAction(data));
    reset();
  };

  //add useEffect in case LOGOUT.
  if (isAuth) {
    localStorage.setItem('auth', true);
    return <Navigate to={ROUTE_PATHS.ADMIN} />;
  }

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__block">
          <form className="login__form" onSubmit={handleSubmit(onSubmit)}>
            <input //
              {...register('name', {
                required: true,
              })}
              add={'add'}
              className="form__input input"
              type="text"
              placeholder="Имя"
            />
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
            <button className="btn btn-primary login__btn">Зарегистрироваться</button>
          </form>
          <div className="auth-bottom">
            Уже есть аккаунт? <NavLink to={ROUTE_PATHS.LOGIN}>Войти</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
