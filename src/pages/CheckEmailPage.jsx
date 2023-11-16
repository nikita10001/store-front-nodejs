import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { orderActions } from '../store/slices/orderSlice';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { ROUTE_PATHS } from '../router';

const CheckEmailPage = () => {
  const dispatch = useDispatch();

  const { token } = useParams();
  const { user } = useSelector((state) => state.auth);
  const { id } = jwtDecode(token);
  const navigate = useNavigate();

  const checkAndNavigate = () => {
    console.log(user.id == id);
    if (user.id == id) {
      dispatch(orderActions.setConfirmed(true));
      navigate(ROUTE_PATHS.CART);
    }
  };

  useEffect(() => {
    checkAndNavigate();
  }, []);
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, background: '#fff', width: '100%', height: '100%', zIndex: 10 }}>
      <h1 style={{ textAlign: 'center', margin: 30, fontSize: 20, fontWeight: 500 }}>Email подтверждён</h1>
    </div>
  );
};

export default CheckEmailPage;
