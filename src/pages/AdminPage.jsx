import React, { useEffect, useState } from 'react';
import SearchDevice from '../components/SearchDevice';
import Preloader from '../components/UI/Preloader';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices, selectDevices } from '../store/slices/deviceSlice';
import { selectFilter } from '../store/slices/filterSlice';
import Modal from '../components/UI/modal/Modal';
import AdminForm from '../components/admin/AdminForm';
import AdminList from '../components/admin/AdminList';
import { authActions, selectAuth } from '../store/slices/authSlice';

const AdminPage = () => {
  const dispatch = useDispatch();
  const { devices, isLoading, error } = useSelector(selectDevices);
  const { query } = useSelector(selectFilter);
  const { modalVisible, editingDeviceId } = useSelector(selectAuth);
  const setModalVisible = (flag) => {
    dispatch(authActions.setModalVisible(flag));
    dispatch(authActions.setEditingDeviceId(null));
  };
  useEffect(() => {
    dispatch(fetchDevices({ query }));
  }, [query, editingDeviceId]);

  if (error) {
    return <h3>{error}</h3>;
  }
  return (
    <div className="page__admin admin">
      <div className="admin__container">
        <SearchDevice />
        <Modal visible={modalVisible} setVisible={setModalVisible}>
          <AdminForm />
        </Modal>
        <button onClick={() => setModalVisible(true)} className="admin__btn btn">
          Добавить устройство
        </button>
        {isLoading ? ( //
          <Preloader />
        ) : (
          <AdminList items={devices} />
        )}
      </div>
    </div>
  );
};

export default AdminPage;
