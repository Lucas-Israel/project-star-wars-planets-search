import React, { useContext, useState } from 'react';
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
    // filterByNumericValues,
    setFilterByNumericValues,
  } = useContext(Context);

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
  };

  const rangeForRandom = 9999999999;
  const random = () => Math.floor(Math.random() * rangeForRandom);
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
          {planets.length > 0
          && Object.keys(planets[0])
            .filter((elem) => selectValues.includes(elem))
            .map((item) => <option key={ random() }>{item}</option>)}
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
