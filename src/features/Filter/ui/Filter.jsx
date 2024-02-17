import React, { memo, useEffect, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames';
import cls from './Filter.module.scss';
import Select from 'shared/ui/select/Select';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBrands, getAllBrandsSelector } from 'store/slices/brandSlice';
import { filterActions } from '../model/slice/filterSlice';

export const Filter = memo((props) => {
  const { className } = props;
  const dispatch = useDispatch();
  const [active, setIsAcitve] = useState(false);
  const [range, setRange] = useState({
    from: '',
    to: '',
  });
  const [brandValue, setBrandValue] = useState('');

  const brands = useSelector(getAllBrandsSelector);

  useEffect(() => {
    dispatch(fetchBrands());
  }, []);

  const onClickApplyFilters = () => {
    dispatch(
      filterActions.setRange({
        from: range.from,
        to: range.to,
      })
    );
    dispatch(filterActions.setBrand(brandValue));
  };

  const handleSelectBrand = (value) => {
    setBrandValue(value);
  };

  const clearFilters = (e) => {
    setRange({
      from: '',
      to: '',
    });
    setBrandValue('');
  };

  return (
    <div className={classNames('filters', {}, [className])}>
      <div className={'filters__wrapper' + (active ? ' active' : ' ')}>
        <div
          onClick={() => {
            setIsAcitve(!active);
          }}
          className="filters__top"
        >
          <h3 className="filters__title">Фильтры</h3>
          {(range.from || range.to || brandValue) && (
            <button onClick={clearFilters} className="filters__btn">
              Сбросить всё x
            </button>
          )}
        </div>
        <div className="filters__body">
          <div className="filters__filter filter">
            <h4 className="filter__title">Производитель</h4>
            <Select //
              value={brandValue}
              setValue={handleSelectBrand}
              options={brands}
              defaultValue="Выберете производителя"
            />
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
          {/* <div className="filters__filter filter">
            <h4 className="filter__title">Рейтинг</h4>
          </div> */}
        </div>
        <button onClick={onClickApplyFilters} className="btn">
          Применить
        </button>
      </div>
    </div>
  );
});
