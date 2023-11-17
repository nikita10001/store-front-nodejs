import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { ROUTE_PATHS } from '../router';
import { checkEmail } from '../store/slices/authSlice';

const CheckEmailPage = () => {
  const dispatch = useDispatch();
  const { token } = useParams();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      dispatch(
        checkEmail({
          token,
          userId: user?.login,
        })
      );
    }
  }, [token]);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        background: '#fff',
        width: '100%',
        height: '100%',
        zIndex: 10,
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
      }}
    >
      <h1 style={{ textAlign: 'center', margin: 30, fontSize: 20, fontWeight: 500 }}>Проверка пройдена</h1>
      <button
        style={{ margin: '0 auto', maxWidth: 200, left: 0, right: 0, zIndex: 10 }}
        className="btn success"
        onClick={() => {
          navigate(ROUTE_PATHS.MAIN);
        }}
      >
        Перейти на главную
      </button>
    </div>
  );
};

export default CheckEmailPage;
