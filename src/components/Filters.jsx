const Filters = () => {};

export default Filters;

const FilterCheckbox = () => {
  return (
    <div className="filters__filter filter filter-checkbox">
      <h4 className="filter__title">Тип</h4>
      <div>
        <input className="filter-checkbox__input" id="fridge" type="checkbox" />
        <label className="filter-checkbox__label" htmlFor="fridge">
          Xолодильники
        </label>
      </div>
      <div>
        <input className="filter-checkbox__input" id="tv" type="checkbox" />
        <label className="filter-checkbox__label" htmlFor="tv">
          Телевизоры
        </label>
      </div>
      <div>
        <input className="filter-checkbox__input" id="phones" type="checkbox" />
        <label className="filter-checkbox__label" htmlFor="phones">
          Телефоны
        </label>
      </div>
    </div>
  );
};
