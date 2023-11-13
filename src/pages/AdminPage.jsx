import React, { useEffect, useState } from 'react';
import Preloader from '../components/UI/Preloader';
import { useSelector } from 'react-redux';
import { selectAllDevices } from '../store/slices/deviceSlice';
import { authActions, selectAuth } from '../store/slices/authSlice';
import { NavLink, useLocation } from 'react-router-dom';

const AdminPage = () => {
  const location = useLocation();
  const { items: devices, isLoading, error } = useSelector(selectAllDevices);

  if (error) {
    return <h3>{error}</h3>;
  }
  return <div className="page__admin admin"></div>;
};

export default AdminPage;
