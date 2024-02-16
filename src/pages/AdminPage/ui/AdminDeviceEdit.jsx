import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDevice } from '../../../store/slices/deviceSlice';
import { PageTop } from 'widgets/PageTop/ui/PageTop';
import { useLocation, useParams } from 'react-router-dom';
import { fetchBrands } from 'store/slices/brandSlice';
import { Form } from './Form';
import Preloader from 'shared/ui/Preloader';
import { fetchAdminDevice, updateDevice } from '../model/slice/adminSlice';

export const AdminDeviceEdit = () => {
  const dispatch = useDispatch();
  const { deviceId } = useParams();

  useEffect(() => {
    dispatch(fetchBrands());
    dispatch(fetchAdminDevice(deviceId));
  }, []);

  const handleSave = useCallback((device) => {
    dispatch(updateDevice(device));
  }, []);

  return (
    <div className="page__admin admin-edit">
      <div className="admin-edit__container">
        <PageTop title={'Изменение данных товара'} />
        <Form //
          isEdit={true}
          onSubmit={handleSave}
        />
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
