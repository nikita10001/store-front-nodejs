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
import { NavLink, useLocation } from 'react-router-dom';
import CommentsList from '../components/CommentsList';
import { CommentService } from '../api/CommentService';

const AdminPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { devices, isLoading, error } = useSelector(selectDevices);

  const [commentsLoading, setCommentsLoading] = useState(true);
  const [items, setItems] = useState([]);

  const fetchComments = async () => {
    try {
      setCommentsLoading(true);
      const fetched = await CommentService.getAllComments();
      setCommentsLoading(false);
      setItems(fetched);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    fetchComments();
  }, []);

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
      {location.pathname === '/admin/devices' ? (
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
      ) : (
        <div className="admin__comments comments-admin">
          <div className="comments-admin__container">
            {commentsLoading ? (
              <Preloader /> //
            ) : (
              <CommentsList comments={items} />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
