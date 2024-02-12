import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { ROUTE_PATHS } from 'shared/config/router';

import { checkEmail, selectAuth } from '../../../store/slices/authSlice';

import Preloader from 'shared/ui/Preloader';

export const CheckEmailPage = () => {
  const dispatch = useDispatch();
  const { user, isLoading, error } = useSelector(selectAuth);

  const [confirmationCode, setConfirmationCode] = useState('');

  const handleCheckEmail = (e) => {
    e.preventDefault();
    if (confirmationCode.length == 6) {
      dispatch(checkEmail({ login: user?.login, confirmationCode }));
    }
    setConfirmationCode('');
  };
  if (isLoading) {
    return <Preloader />;
  }
  if (!user) {
    return <Navigate to={ROUTE_PATHS.LOGIN} />;
  }
  if (user?.isVerified) {
    return <Navigate to={ROUTE_PATHS.MAIN} />;
  }
  return (
    <div className="confirm-email">
      <div className="confirm-email__container">
        <div className="confirm-email__inner">
          <p className="confirm-email__text">Подтверждение регистрации</p>
          <p className="confirm-email__text">Введите код, отправленный вам на почту</p>

          <form onSubmit={handleCheckEmail} className="confirm-email__actions">
            <input //
              onChange={(e) => setConfirmationCode(e.target.value)}
              value={confirmationCode}
              maxLength={6}
              required
              minLength={6}
              className="confirm-email__input input"
              type="text"
            />
            <button type="submit" className="confirm-email__btn btn outline">
              Проверить
            </button>
          </form>
          {/* {error && <div style={{ color: 'red', padding: '20px' }}>{error ? 'Неверный код' : ''}</div>} */}
        </div>
      </div>
    </div>
  );
};
