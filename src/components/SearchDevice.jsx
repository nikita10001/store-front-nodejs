import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { filterActions } from '../store/slices/filterSlice';

const SearchDevice = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');

  const inputRef = useRef(null);

  const updateQuery = useCallback(
    debounce((q) => {
      dispatch(filterActions.setQuery(q));
    }, 300),
    []
  );

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    updateQuery(inputValue);
  };

  const handleClear = () => {
    setValue('');
    dispatch(filterActions.setQuery(''));
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    return () => {
      handleClear();
    };
  }, []);

  return (
    <div className="catalog__search search-devices">
      <div className="search-devices__wrapper">
        <input //
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          className="search-devices__input input"
          placeholder="Поиск"
        />
        {value && (
          <svg onClick={handleClear} height="14px" version="1.1" viewBox="0 0 14 14" width="14px" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd" id="Page-1" stroke="none" strokeWidth="1">
              <g fill="#000000" id="Core" transform="translate(-341.000000, -89.000000)">
                <g id="close" transform="translate(341.000000, 89.000000)">
                  <path
                    d="M14,1.4 L12.6,0 L7,5.6 L1.4,0 L0,1.4 L5.6,7 L0,12.6 L1.4,14 L7,8.4 L12.6,14 L14,12.6 L8.4,7 L14,1.4 Z"
                    id="Shape"
                  />
                </g>
              </g>
            </g>
          </svg>
        )}
      </div>
    </div>
  );
};

export default SearchDevice;
