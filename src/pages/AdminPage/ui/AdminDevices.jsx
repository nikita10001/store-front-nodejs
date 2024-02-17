import React, { useEffect, useState } from 'react';
import SearchDevice from '../../../components/SearchDevice';

import Preloader from 'shared/ui/Preloader';
import { AdminList } from 'entities/Admin';

import { fetchDevices, selectAllDevices } from '../../../store/slices/deviceSlice';

import { useDispatch, useSelector } from 'react-redux';

import { NavLink } from 'react-router-dom';

import { Pagination } from 'shared/ui/pagination/Pagination.jsx';

//нельзя
import { selectFilter } from 'features/Filter';

export const AdminDevices = () => {
  const dispatch = useDispatch();
  const { items: devices, isLoading, error, totalItems } = useSelector(selectAllDevices);
  const { query } = useSelector(selectFilter);

  const [limit, setLimit] = useState(10);

  const [currentPage, setCurrentPage] = useState(1);

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    dispatch(fetchDevices({ query, limit, currentPage }));
  }, [query, currentPage]);

  return (
    <div className="page__admin admin-devices">
      <div className="admin-devices__container">
        <SearchDevice />
        <NavLink to="create/" className="admin__btn btn">
          Добавить устройство
        </NavLink>
        {isLoading ? ( //
          <Preloader />
        ) : (
          <>
            <AdminList items={devices} />
            <Pagination currentPage={currentPage} onChagePage={onChangePage} totalCount={totalItems} limit={limit} />
          </>
        )}
      </div>
    </div>
  );
};
