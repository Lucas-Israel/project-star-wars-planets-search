import React, { useContext, useEffect } from 'react';
import Context from '../context/Context';

function OrderControl() {
  const {
    order,
    orderHandler,
    selectValues,
    random,
    sendOrderHandler,
  } = useContext(Context);

  useEffect(() => {

  }, [order]);

  return (
    <section>
      <label htmlFor="column">
        <select
          name="column"
          data-testid="column-sort"
          value={ order.column }
          onChange={ orderHandler }
        >
          {selectValues.map((item) => (
            <option
              key={ random() }
              name={ item }
            >
              {item}

            </option>
          ))}
        </select>
      </label>
      <div>
        <label htmlFor="sort">
          <b>Ascendente</b>
          <input
            name="sort"
            type="radio"
            value="ASC"
            onChange={ orderHandler }
            checked={ order.sort === 'ASC' }
            data-testid="column-sort-input-asc"
          />
        </label>
        <label htmlFor="sort">
          <b>Descendente</b>
          <input
            name="sort"
            value="DESC"
            onChange={ orderHandler }
            checked={ order.sort === 'DESC' }
            data-testid="column-sort-input-desc"
            type="radio"
          />
        </label>
      </div>
      <button
        type="button"
        data-testid="column-sort-button"
        onClick={ sendOrderHandler }
      >
        Ordenar
      </button>
    </section>
  );
}

export default OrderControl;
