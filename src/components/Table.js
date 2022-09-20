import React, { useContext, useEffect, useState } from 'react';
import Context from '../context/Context';

function Table() {
  const { planets } = useContext(Context);
  const [inputFilterName, setInputFilterName] = useState('');

  useEffect(() => planets, [planets]);

  const inputHandler = ({ target }) => {
    const { value } = target;
    setInputFilterName(value);
  };

  const value = inputFilterName.length === 0
    ? planets
    : planets.filter((a) => a.name.toLowerCase()
      .includes(inputFilterName.toLocaleLowerCase()));

  const rangeForRandom = 9999999999;
  const random = () => Math.floor(Math.random() * rangeForRandom);
  return (
    <section>
      <label htmlFor="inputNameFilter">
        <input
          id="inputNameFilter"
          type="text"
          data-testid="name-filter"
          value={ inputFilterName }
          onChange={ inputHandler }
        />
      </label>
      <table>
        <thead>
          <tr>
            {planets.length > 0
            && Object.keys(planets[0]).map((item) => <th key={ random() }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {value.length > 0
          && value.map((item) => (
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
