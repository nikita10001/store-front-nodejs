import React, { useEffect, useMemo, useState } from 'react';
import Select from './UI/select/Select';
import { useInput } from '../hooks/useInput';
import { BrandService } from '../api/BrandService';
import { useDispatch } from 'react-redux';
import { filterActions } from '../store/slices/filterSlice';

const Filters = () => {
  const dispatch = useDispatch();
  const [active, setIsAcitve] = useState(false);

  const [range, setRange] = useState({
    from: '',
    to: '',
  });
  const [value, setValue] = useState('');
  const [brands, setBrands] = useState([]);
  const fetchBrands = async () => {
    const data = await BrandService.getAllBrands();
    setBrands(data);
  };
  useEffect(() => {
    // fetchBrands();
  }, []);
  const options = brands.map((brand, i) => ({
    id: i,
    name: brand,
    value: brand.toLowerCase(),
  }));

  const onClickApplyFilters = () => {
    dispatch(
      filterActions.setRange({
        from: range.from,
        to: range.to,
      })
    );
  };

  const clearFilters = () => {
    setRange({
      from: '',
      to: '',
    });
  };

  return (
    <div className="filters">
      <div className={'filters__wrapper' + (active ? ' active' : ' ')}>
        <div
          onClick={() => {
            setIsAcitve(!active);
          }}
          className="filters__top"
        >
          <h3 className="filters__title">Фильтры</h3>
          {(range.from || range.to) && (
            <button onClick={() => clearFilters()} className="filters__btn">
              Сбросить всё x
            </button>
          )}
        </div>
        <div className="filters__body">
          <div className="filters__filter filter">
            <h4 className="filter__title">Производитель</h4>
            <Select value={value} setValue={setValue} options={options} defaultValue="Выберете производителя" />
          </div>
          <div className="filters__filter filter">
            <h4 className="filter__title">Цена</h4>
            <input //
              value={range.from}
              onChange={(e) => setRange({ ...range, from: e.target.value })}
              className="filter__input input"
              placeholder="От"
              type="number"
            />
            <input //
              value={range.to}
              onChange={(e) => setRange({ ...range, to: e.target.value })}
              className="filter__input input"
              placeholder="До"
              type="number"
            />
          </div>
        </div>
        <button onClick={onClickApplyFilters} className="btn">
          Применить
        </button>
      </div>
    </div>
  );
};

export default Filters;
