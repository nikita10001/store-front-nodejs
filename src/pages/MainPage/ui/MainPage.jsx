import React, { useEffect, useState } from 'react';
import Preloader from 'shared/ui/Preloader.jsx';

import SearchDevice from '../../../components/SearchDevice.jsx';
import Filters from '../../../components/Filters.jsx';

import { useDispatch, useSelector } from 'react-redux';

import { fetchDevices, selectAllDevices } from '../../../store/slices/deviceSlice.js';
import { selectFilter } from '../../../store/slices/filterSlice.js';
import { Pagination } from 'shared/ui/pagination/Pagination.jsx';
import MainSelect from 'shared/ui/select/MainSelect.jsx';

import { useSortedDevices } from 'shared/lib/hooks/useDevices.js';
import { DevicesList } from 'entities/Device';

const options = [
  { id: 1, value: 'name', name: 'По названию' },
  { id: 2, value: 'price', name: 'По цене' },
  { id: 3, value: 'rating', name: 'По рейтингу' },
  { id: 4, value: 'commentsAmount', name: 'С отзывами' },
];

export const MainPage = () => {
  const dispatch = useDispatch();
  const { items, isLoading, totalItems } = useSelector(selectAllDevices);
  const { query, range, brand } = useSelector(selectFilter);
  const [limit, setLimit] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  const [filterValue, setFilterValue] = useState('');

  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(
      fetchDevices({
        query, //
        limit,
        currentPage,
        rangeFrom: range.from,
        rangeTo: range.to,
        brand,
      })
    );
  }, [range, currentPage, brand]);
  //test use effect only when query
  useEffect(() => {
    setCurrentPage(1);
    window.scrollTo(0, 0);
    dispatch(fetchDevices({ query, limit, currentPage, rangeFrom: range.from, rangeTo: range.to }));
  }, [query]);

  // temp

  const sortedDevices = useSortedDevices(items, filterValue);
  //

  return (
    <div className="page__catalog catalog">
      <div className="catalog__container">
        <div className="catalog__filters">
          <Filters />
        </div>
        <div className="catalog__body">
          <div className="catalog__top">
            <SearchDevice />
            <MainSelect defaultValue={'По умолчанию'} value={filterValue} setValue={setFilterValue} options={options} />
          </div>
          {isLoading ? ( //
            <Preloader />
          ) : (
            <>
              <DevicesList devices={sortedDevices} />
              <Pagination currentPage={currentPage} onChagePage={onChangePage} totalCount={totalItems} limit={limit} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
