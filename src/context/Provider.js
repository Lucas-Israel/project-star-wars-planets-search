import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Context from './Context';

const urlToFetch = 'https://swapi.dev/api/planets';

const selectValues = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

const initialOrder = {
  column: 'population',
  sort: '',
};

const random = () => {
  const rangeForRandom = 9999999999;
  return Math.floor(Math.random() * rangeForRandom);
};

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [inputFilterName, setInputFilterName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [showPlanets, setShowPlanets] = useState([]);
  const [order, setOrder] = useState(initialOrder);
  const [doOrder, setDoOrder] = useState(false);

  const getPlanets = async () => {
    const data0 = await fetch(urlToFetch).then((info) => info.json());
    const data1 = data0.results;
    const results = data1.filter((item) => delete item.residents);
    setPlanets(results);
  };

  const inputHandler = ({ target }) => {
    const { value } = target;
    setInputFilterName(value);
  };

  const orderHandler = ({ target }) => {
    const { name, value } = target;
    setOrder((before) => ({
      ...before,
      [name]: value,
    }));
  };

  const sendOrderHandler = () => {
    setDoOrder(true);
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
      default: planetasFiltrados = planetasFiltrados
        .filter((planet) => +planet[column] < +value);
        break;
      }
    };

    if (planets.length > 0 && filterByNumericValues.length > 0) {
      filterByNumericValues.forEach((item) => filterParameters(item));
      setShowPlanets(planetasFiltrados);
    }
  }, [planets, inputFilterName, filterByNumericValues]);

  useEffect(() => {
    const sortParameters = (param) => {
      setDoOrder(false);
      const { column, sort } = param;
      if (sort === 'ASC') {
        showPlanets
          .sort((a, b) => b[column] - a[column]);

        showPlanets
          .sort((a, b) => a[column] - b[column]);
      }
      if (sort === 'DESC') {
        showPlanets
          .sort((a, b) => b[column] - a[column]);
      }
    };
    if (doOrder) sortParameters(order);
  }, [order, showPlanets, doOrder]);

  const contextValue = {
    planets,
    inputFilterName,
    inputHandler,
    filterByNumericValues,
    setFilterByNumericValues,
    showPlanets,
    order,
    setOrder,
    selectValues,
    random,
    initialOrder,
    orderHandler,
    sendOrderHandler,
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
