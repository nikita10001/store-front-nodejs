import React, { memo, useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Select from 'shared/ui/select/Select';
import { getAllBrandsSelector } from 'store/slices/brandSlice';

const EMPTY_DEVICE_STATE = {
  name: '',
  price: '',
  rating: '',
  img: '',
  description: '',
};

export const Form = memo((props) => {
  const { isEdit = false, onSubmit, savedDevice } = props;

  const brands = useSelector(getAllBrandsSelector);
  console.log('brands', brands);

  const [values, setValues] = useState(savedDevice ? savedDevice : EMPTY_DEVICE_STATE);

  const [brandValue, setBrandValue] = useState(savedDevice ? savedDevice?.brand?.value : '');

  const handleChange = useCallback((e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }, []);

  const handleForm = useCallback((e) => {
    e.preventDefault();
    if (Object.values(values).every(Boolean) && brandValue) {
      onSubmit(values, brandValue);
      setValues(EMPTY_DEVICE_STATE);
      setBrandValue('');
    }
  }, []);

  const buttonText = isEdit ? 'Сохранить' : 'Добавить';

  return (
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

      <Select //
        className="form-admin__select"
        options={brands}
        value={brandValue}
        setValue={setBrandValue}
        defaultValue={'Производитель'}
      />

      <button onClick={handleForm} className="btn">
        {buttonText}
      </button>
    </form>
  );
});
