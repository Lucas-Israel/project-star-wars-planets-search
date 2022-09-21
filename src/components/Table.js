import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function Table() {
  const {
    planets,
    showPlanets,
  } = useContext(Context);

  useEffect(() => {
  }, [planets, showPlanets]);

  const rangeForRandom = 9999999999;
  const random = () => Math.floor(Math.random() * rangeForRandom);
  return (
    <section>

      <table>

        <thead>
          <tr>
            {planets.length > 0
            && Object.keys(planets[0]).map((item) => <th key={ random() }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {showPlanets.length > 0
          && showPlanets.map((item) => (
            <tr key={ random() }>
              {Object.values(item).map((dado) => (typeof dado === 'string'
                ? <td key={ random() }>{dado}</td>
                : <td key={ random() }>{dado.map((data) => `${data} `)}</td>))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
