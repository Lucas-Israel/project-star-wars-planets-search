import React, { useEffect, useState } from 'react';
import Proptypes from 'prop-types';
import Context from './Context';

const urlToFetch = 'https://swapi.dev/api/planets';

function Provider({ children }) {
  const [planets, setPlanets] = useState([]);

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

  useEffect(() => { getPlanets(); }, []);

  const contextValue = {
    planets,
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
