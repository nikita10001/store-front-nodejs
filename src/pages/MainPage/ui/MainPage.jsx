import React, { useEffect, useState } from 'react';
import Preloader from 'shared/ui/Preloader.jsx';

import SearchDevice from '../../../components/SearchDevice.jsx';

import { useDispatch, useSelector } from 'react-redux';

import { fetchDevices, selectAllDevices } from '../../../store/slices/deviceSlice.js';
import { Pagination } from 'shared/ui/pagination/Pagination.jsx';

import { useSortedDevices } from 'shared/lib/hooks/useDevices.js';
import { DevicesList } from 'entities/Device';
import Select from 'shared/ui/select/Select.jsx';
import { Filter, selectFilter } from 'features/Filter';

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
  const [currentPage, setCurrentPage] = useState(1);

  const [limit, setLimit] = useState(6);
  const limitList = [10, 20, 30];
  console.log(limit);
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
  }, [range, currentPage, brand, limit]);
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
          <Filter />
        </div>
        <div className="catalog__body">
          <div className="catalog__top">
            <SearchDevice />
            <Select defaultValue={'По умолчанию'} value={filterValue} setValue={setFilterValue} options={options} />
            <div>
              {limitList.map((l) => (
                <button
                  onClick={() => {
                    setLimit(l);
                  }}
                  className="btn"
                >
                  {l}
                </button>
              ))}
            </div>
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
