import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDevice, updateDevice } from '../../store/slices/deviceSlice';
import { authActions, selectAuth } from '../../store/slices/authSlice';

const EMPTY_DEVICE_STATE = {
  name: '',
  price: '',
  rating: '',
  img: '',
  description: '',
};

const AdminForm = () => {
  const dispatch = useDispatch();
  const { editingDeviceId } = useSelector(selectAuth);
  const currentDevice = useSelector((state) => state.devices.devices.find((device) => device.id === editingDeviceId));
  const [device, setDevice] = useState(EMPTY_DEVICE_STATE);

  useEffect(() => {
    if (editingDeviceId) {
      setDevice(currentDevice || EMPTY_DEVICE_STATE);
    } else {
      setDevice(EMPTY_DEVICE_STATE);
    }
  }, [currentDevice, editingDeviceId]);

  const handleChange = (e) => {
    setDevice({ ...device, [e.target.name]: e.target.value });
  };
  const handleDeviceSubmit = (e, action) => {
    e.preventDefault();
    if (Object.values(device).every(Boolean)) {
      dispatch(action(device));
      dispatch(authActions.setModalVisible(false));
      setDevice(EMPTY_DEVICE_STATE);
    }
  };
  const handleAdd = (e) => {
    handleDeviceSubmit(e, createDevice);
  };
  const handleSave = (e) => {
    handleDeviceSubmit(e, updateDevice);
    dispatch(authActions.setEditingDeviceId(null));
  };
  return (
    <form className="admin__form form-admin" action="">
      <input //
        name="name"
        onChange={handleChange}
        value={device.name}
        placeholder="Название"
        className="input"
        type="text"
      />
      <input //
        name="price"
        onChange={handleChange}
        value={device.price}
        placeholder="Цена"
        className="input"
        type="number"
      />
      <input //
        name="rating"
        onChange={handleChange}
        value={device.rating}
        placeholder="Рейтинг"
        className="input"
        type="number"
      />
      <input //
        name="img"
        onChange={handleChange}
        value={device.img}
        placeholder="Ссылка на изображение"
        className="input"
        type="text"
      />
      <input //
        name="description"
        onChange={handleChange}
        value={device.description}
        placeholder="Описание"
        className="input"
        type="text"
      />

      {editingDeviceId ? (
        <button onClick={handleSave} className="btn">
          Сохранить
        </button>
      ) : (
        <button onClick={handleAdd} className="btn">
          Добавить
        </button>
      )}
    </form>
  );
};

export default AdminForm;
