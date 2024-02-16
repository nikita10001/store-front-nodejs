import React, { memo, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from 'shared/ui/input/Input';
import Select from 'shared/ui/select/Select';
import { getAllBrandsSelector } from 'store/slices/brandSlice';
import cls from './Form.module.scss';
import { DeviceInfoList } from 'entities/Device';
import Button from 'shared/ui/button/Button';
import { classNames } from 'shared/lib/classNames';
import { selectDevice, selectIsLoading } from '../model/selectors/adminSelectors';
import { adminActions } from '../model/slice/adminSlice';
import Preloader from 'shared/ui/Preloader';
import { InfoList } from './InfoList';

export const Form = memo((props) => {
  const { isEdit = false, onSubmit } = props;
  const dispatch = useDispatch();
  const brands = useSelector(getAllBrandsSelector);
  const device = useSelector(selectDevice);
  const isLoading = useSelector(selectIsLoading);
  const handleBrand = (value) => {
    dispatch(adminActions.updateDevice({ brand: value }));
  };
  const handleChange = (e) => {
    dispatch(adminActions.updateDevice({ [e.target.name]: e.target.value }));
  };
  const handleForm = (e) => {
    e.preventDefault();
    const { characteristics, commentsAmount, ...toCheck } = device;
    if (Object.values(toCheck).every(Boolean)) {
      onSubmit(device);
    }
  };

  const buttonText = isEdit ? 'Сохранить' : 'Добавить';
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <form className="form-admin" action="">
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

      <Select //
        className="form-admin__select"
        options={brands}
        value={device?.brand}
        setValue={handleBrand}
        defaultValue={'Производитель'}
      />

      <InfoList list={device.characteristics} />
      <button onClick={handleForm} className="btn">
        {buttonText}
      </button>
    </form>
  );
});
