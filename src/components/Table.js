import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function Table() {
  const {
    planets,
    showPlanets,
    random,
  } = useContext(Context);

  useEffect(() => {
  }, [planets, showPlanets]);

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
          && showPlanets.map((item) => {
            const { name } = item;
            return (
              <tr key={ random() }>
                {Object.values(item).map((dado) => {
                  if (dado === name) {
                    return (
                      <td
                        key={ random() }
                        data-testid="planet-name"
                      >
                        {dado}
                      </td>
                    );
                  }
                  if (Array.isArray(dado)) {
                    return (
                      <td
                        key={ random() }
                      >
                        {dado.map((data) => `${data} `)}

                      </td>
                    );
                  }
                  return <td key={ random() }>{dado}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Table;
