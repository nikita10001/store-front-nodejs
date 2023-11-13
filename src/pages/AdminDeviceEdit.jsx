import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDevice, fetchSingleDevice, updateDevice } from '../store/slices/deviceSlice';
import PageTop from '../components/PageTop';
import { useLocation, useParams } from 'react-router-dom';

const EMPTY_DEVICE_STATE = {
  name: '',
  price: '',
  rating: '',
  img: '',
  description: '',
};

const AdminDeviceEdit = () => {
  const location = useLocation();
  const isCreate = location.pathname == '/admin/devices/create/';
  const { deviceId } = useParams();
  const dispatch = useDispatch();

  const { item: savedDevice, isLoading, error } = useSelector((state) => state.devices.device);
  const [values, setValues] = useState(EMPTY_DEVICE_STATE);

  useEffect(() => {
    if (!isCreate) {
      dispatch(fetchSingleDevice(deviceId));
    }
  }, []);

  useEffect(() => {
    if (!isCreate && savedDevice) {
      setValues(savedDevice);
      console.log(savedDevice);
    }
  }, [savedDevice]);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleDeviceSubmit = (e, action) => {
    e.preventDefault();
    if (Object.values(values).every(Boolean)) {
      dispatch(action(values));
      setValues(EMPTY_DEVICE_STATE);
    }
  };
  const handleAdd = (e) => {
    handleDeviceSubmit(e, createDevice);
  };
  const handleSave = (e) => {
    handleDeviceSubmit(e, updateDevice);
  };
  return (
    <div className="page__admin admin-edit">
      <div className="admin-edit__container">
        <PageTop title={isCreate ? 'Добавление товара' : 'Изменение данных товара'} />
        <form className="form-admin" action="">
          <input //
            name="name"
            onChange={handleChange}
            value={values.name}
            placeholder="Название"
            className="input"
            type="text"
          />
          <input //
            name="price"
            onChange={handleChange}
            value={values.price}
            placeholder="Цена"
            className="input"
            type="number"
          />
          <input //
            name="rating"
            onChange={handleChange}
            value={values.rating}
            placeholder="Рейтинг"
            className="input"
            type="number"
          />
          <input //
            name="img"
            onChange={handleChange}
            value={values.img}
            placeholder="Ссылка на изображение"
            className="input"
            type="text"
          />
          <input //
            name="description"
            onChange={handleChange}
            value={values.description}
            placeholder="Описание"
            className="input"
            type="text"
          />

          {!isCreate ? (
            <button onClick={handleSave} className="btn">
              Сохранить
            </button>
          ) : (
            <button onClick={handleAdd} className="btn">
              Добавить
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default AdminDeviceEdit;
