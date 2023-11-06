import React, { useEffect, useState } from 'react';
import Preloader from '../components/UI/Preloader.jsx';
import SearchDevice from '../components/SearchDevice.jsx';
import Filters from '../components/Filters.jsx';
import DevicesList from '../components/DevicesList.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDevices, selectDevices } from '../store/slices/deviceSlice.js';
import { selectFilter } from '../store/slices/filterSlice.js';
import Pagination from '../components/Pagination/Pagination.jsx';

const MainPage = () => {
  const dispatch = useDispatch();
  const { devices, isLoading, totalCount } = useSelector(selectDevices);
  const { query, range } = useSelector(selectFilter);

  const [currentPage, setCurrentPage] = useState(0);

  const onChangePage = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(fetchDevices({ query, rangeFrom: range.from, rangeTo: range.to, limit: 5, skip: currentPage * 5 }));
  }, [query, range, currentPage]);
  return (
    <div className="page__catalog catalog">
      <div className="catalog__container">
        <div className="catalog__filters">
          <Filters />
        </div>
        <div className="catalog__body">
          <SearchDevice />
          {isLoading || !devices.length ? ( //
            <Preloader />
          ) : (
            <>
              <DevicesList devices={devices} />
              <Pagination currentPage={currentPage} onChagePage={onChangePage} totalCount={totalCount} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
