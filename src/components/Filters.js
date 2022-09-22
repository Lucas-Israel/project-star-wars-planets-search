import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

const selectValues = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const INITIAL_FILTER_STATE = {
  column: 'population',
  comparison: 'maior que',
  value: 0,
};

function Filters() {
  const {
    inputFilterName,
    inputHandler,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(Context);

  const [columnFilter, setColumnFilter] = useState([]);
  const [aditionalCondition, setAditionalCondition] = useState(false);

  useEffect(() => {
    setColumnFilter(selectValues);
  }, []);

  useEffect(() => {
    const ghi = () => {
      const abc = filterByNumericValues.map(({ column }) => column);
      const def = columnFilter.filter((r) => !abc.includes(r));
      setAditionalCondition(false);
      return def;
    };
    if (aditionalCondition === true) setColumnFilter(ghi());
  }, [filterByNumericValues, aditionalCondition, columnFilter]);

  const rangeForRandom = 9999999999;
  const random = () => Math.floor(Math.random() * rangeForRandom);

  const [filterState, setFilterState] = useState(INITIAL_FILTER_STATE);
  const { column, comparison, value } = filterState;

  const filterHandler = ({ target }) => {
    const { name, value: valor } = target;
    setFilterState((before) => ({
      ...before,
      [name]: valor,
    }));
  };

  useEffect(() => {
    setFilterState((before) => ({
      ...before,
      column: columnFilter[0],
    }));
  }, [columnFilter]);

  const setFilterStateToGlobal = () => {
    if (columnFilter.length > 0) {
      setFilterByNumericValues((before) => ([
        ...before,
        filterState,
      ]));
      setAditionalCondition(true);
    }
  };

  const filterDelClick = ({ target }) => {
    const { value: columnFilterValue } = target;
    setAditionalCondition(true);
    setFilterByNumericValues(
      filterByNumericValues
        .filter(({ column: filByNumVal }) => filByNumVal !== columnFilterValue),
    );
    setColumnFilter((before) => before.concat(columnFilterValue));
  };

  const delAllFiltersClick = () => {
    setAditionalCondition(true);
    setFilterByNumericValues([]);
    setColumnFilter(selectValues);
  };

  return (
    <section>
      <label htmlFor="inputNameFilter">
        Filtrar por nome:
        {' '}
        <input
          id="inputNameFilter"
          type="text"
          data-testid="name-filter"
          placeholder="procurar nome de planeta"
          value={ inputFilterName }
          onChange={ inputHandler }
        />
      </label>

      <br />

      <label htmlFor="column-filter">
        Coluna:
        {' '}
        <select
          id="column-filter"
          data-testid="column-filter"
          name="column"
          value={ column }
          onChange={ filterHandler }
          onClick={ filterHandler }
        >
          {columnFilter.map((item) => <option key={ random() }>{item}</option>)}
        </select>
      </label>

      <br />

      <label htmlFor="comparison-filter">
        Operador:
        {' '}
        <select
          id="comparison-filter"
          data-testid="comparison-filter"
          name="comparison"
          value={ comparison }
          onChange={ filterHandler }
        >
          <option>maior que</option>
          <option>menor que</option>
          <option>igual a</option>
        </select>
      </label>
      {' '}
      <label htmlFor="value-filter">
        <input
          id="value-filter"
          data-testid="value-filter"
          type="number"
          name="value"
          value={ value }
          onChange={ filterHandler }
        />
      </label>

      <br />

      <button
        data-testid="button-filter"
        type="button"
        onClick={ setFilterStateToGlobal }
      >
        Filtrar

      </button>
      <div>
        Filtros:
        {' '}
        {
          filterByNumericValues.length > 0 && filterByNumericValues
            .map(({ column: coluna }) => (
              <div
                key={ random() }
                data-testid="filter"
              >
                {coluna}
                {' '}
                <button
                  type="button"
                  value={ coluna }
                  onClick={ filterDelClick }
                >
                  deletar

                </button>
              </div>))
        }
      </div>
      <div>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ delAllFiltersClick }
        >
          Remover filtros

        </button>
      </div>
    </section>
  );
}

export default Filters;
