import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function Table() {
  const { planets, getPlanets } = useContext(Context);
  useEffect(() => getPlanets(), [planets, getPlanets]);
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
          {planets.length > 0
          && planets.map((item) => (
            <tr key={ random() }>
              {Object.values(item).map((dado) => <td key={ random() }>{dado}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
