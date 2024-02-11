import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDevice, fetchSingleDevice, updateDevice } from '../../../store/slices/deviceSlice';
import PageTop from '../../../components/PageTop';
import { useLocation, useParams } from 'react-router-dom';
import { fetchBrands } from 'store/slices/brandSlice';
import { Form } from './Form';
import Preloader from 'shared/ui/Preloader';

export const AdminDeviceEdit = () => {
  const dispatch = useDispatch();
  const { deviceId } = useParams();

  const { item: savedDevice, isLoading } = useSelector((state) => state.devices.device);

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchSingleDevice(deviceId));
  }, []);

  const handleSave = useCallback((values, brandValue) => {
    dispatch(updateDevice({ ...values, brandValue }));
  }, []);

  return (
    <div className="page__admin admin-edit">
      <div className="admin-edit__container">
        <PageTop title={'Изменение данных товара'} />
        {isLoading ? (
          <Preloader />
        ) : (
          <Form //
            isEdit={true}
            onSubmit={handleSave}
            savedDevice={savedDevice}
          />
        )}
      </div>
    </div>
  );
};
// const handleDeviceSubmit = (e, action) => {
//   e.preventDefault();
//   if (Object.values(values).every(Boolean) && brandValue) {
//     dispatch(action({ ...values, brandValue }));
//     setValues(EMPTY_DEVICE_STATE);
//     setBrandValue('');
//   }
// };
