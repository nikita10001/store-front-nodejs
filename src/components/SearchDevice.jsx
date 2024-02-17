import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';
import { ReactComponent as SearchClearIcon } from 'shared/assets/icons/search-clear-icon.svg';
import { filterActions } from 'features/Filter';

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
          <div onClick={handleClear} className="search-devices__btn">
            <SearchClearIcon />
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchDevice;
