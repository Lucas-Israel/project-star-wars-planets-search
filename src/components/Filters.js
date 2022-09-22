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
    planets,
    inputFilterName,
    inputHandler,
    filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(Context);

  const [columnFilter, setColumnFilter] = useState([]);
  const [aditionalCondition, setAditionalCondition] = useState(false);

  useEffect(() => {
    const settingColumnFilter = async () => {
      setColumnFilter(Object.keys(await planets[0])
        .filter((elem) => selectValues.includes(elem))
        .map((item) => item));
    };
    if (planets.length > 0) settingColumnFilter();
  }, [planets]);

  useEffect(() => {
    const ghi = () => {
      const abc = filterByNumericValues.map(({ column }) => column);
      const def = columnFilter.filter((r) => !abc.includes(r));
      setAditionalCondition(false);
      return def;
    };
    if (filterByNumericValues.length > 0
      && aditionalCondition === true) setColumnFilter(ghi());
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

  const setFilterStateToGlobal = () => {
    setFilterByNumericValues((before) => ([
      ...before,
      filterState,
    ]));
    setAditionalCondition(true);
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
        >
          {columnFilter.sort().map((item) => <option key={ random() }>{item}</option>)}
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
    </section>
  );
}

export default Filters;
