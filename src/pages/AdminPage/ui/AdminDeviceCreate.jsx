import React, { useCallback, useEffect } from 'react';
import { PageTop } from 'widgets/PageTop';
import { useDispatch } from 'react-redux';
import { Form } from './Form';
import { fetchBrands } from 'store/slices/brandSlice';
import { createDevice } from '../model/slice/adminSlice';

export const AdminDeviceCreate = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  const handleAdd = useCallback((device) => {
    dispatch(createDevice(device));
  }, []);

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
