import React, { useEffect } from 'react';
import PageTop from 'components/PageTop';
import { useDispatch } from 'react-redux';
import { createDevice } from 'store/slices/deviceSlice';
import { Form } from './Form';
import { fetchBrands } from 'store/slices/brandSlice';

export const AdminDeviceCreate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  const handleAdd = (values, brandValue) => {
    dispatch(createDevice({ ...values, brandValue }));
  };

  return (
    <div className="page__admin admin-edit">
      <div className="admin-edit__container">
        <PageTop title={'Добавление товара'} />
        <Form //
          onSubmit={handleAdd}
        />
      </div>
    </div>
  );
};
