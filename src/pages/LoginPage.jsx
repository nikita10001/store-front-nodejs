import React from 'react';
import { ROUTE_PATHS } from '../router';
import { Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authAction, selectAdmin } from '../store/slices/adminSlice';
import { useForm } from 'react-hook-form';
const Auth = () => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: 'onBlur',
  });
  const { isAuth, error } = useSelector(selectAdmin);

  const onSubmit = (data) => {
    dispatch(authAction(data));
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
            {error && <p className="error-password">Неправильный логин или пароль!</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
