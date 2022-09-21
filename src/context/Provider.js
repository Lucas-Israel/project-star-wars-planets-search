import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Context from './Context';

const urlToFetch = 'https://swapi.dev/api/planets';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [inputFilterName, setInputFilterName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [showPlanets, setShowPlanets] = useState([]);

  const getPlanets = async () => {
    try {
      const data0 = await fetch(urlToFetch).then((info) => info.json());
      const data1 = data0.results;
      const results = data1.filter((item) => delete item.residents);
      setPlanets(results);
    } catch (e) {
      console.log(e.message);
    }
  };

  const inputHandler = ({ target }) => {
    const { value } = target;
    setInputFilterName(value);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  useEffect(() => {
    const filteringByName = (a) => a.name.toLowerCase()
      .includes(inputFilterName.toLocaleLowerCase());

    if (inputFilterName.length === 0) setShowPlanets(planets);

    if (inputFilterName.length > 0) setShowPlanets(planets.filter(filteringByName));

    let planetasFiltrados = planets;
    const filterParameters = (param) => {
      const { column, comparison, value } = param;
      switch (comparison) {
      case 'igual a':
        planetasFiltrados = planetasFiltrados
          .filter((planet) => +planet[column] === +value);
        break;
      case 'maior que':
        planetasFiltrados = planetasFiltrados
          .filter((planet) => +planet[column] > +value);
        break;
      case 'menor que':
        planetasFiltrados = planetasFiltrados
          .filter((planet) => +planet[column] < +value);
        break;
      default:
        break;
      }
    };

    if (planets.length > 0 && filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((item) => filterParameters(item));
      setShowPlanets(planetasFiltrados);
    }
  }, [planets, inputFilterName, filterByNumericValues]);

  const contextValue = {
    planets,
    inputFilterName,
    inputHandler,
    filterByNumericValues,
    setFilterByNumericValues,
    showPlanets,
  };

  return (
    <Context.Provider value={ contextValue }>
      {children}
    </Context.Provider>
  );
}

Provider.propTypes = {
  children: Proptypes.node.isRequired,
};

export default Provider;
