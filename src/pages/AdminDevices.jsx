import React, { useEffect } from 'react';
import SearchDevice from '../components/SearchDevice';
import Preloader from '../components/UI/Preloader';
import AdminList from '../components/admin/AdminList';
import { fetchDevices, selectAllDevices } from '../store/slices/deviceSlice';
import { useDispatch, useSelector } from 'react-redux';
import { selectFilter } from '../store/slices/filterSlice';
import { NavLink } from 'react-router-dom';
import { selectAuth } from '../store/slices/authSlice';

const AdminDevices = () => {
  const dispatch = useDispatch();
  const { items: devices, isLoading, error } = useSelector(selectAllDevices);
  const { query } = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchDevices({ query }));
  }, [query]);

  return (
    <div className="page__admin admin-devices">
      <div className="admin-devices__container">
        <SearchDevice />
        <NavLink to="create/" className="admin__btn btn">
          Добавить устройство
        </NavLink>
        {isLoading ? ( //
          <Preloader />
        ) : (
          <AdminList items={devices} />
        )}
      </div>
    </div>
  );
};

export default AdminDevices;
