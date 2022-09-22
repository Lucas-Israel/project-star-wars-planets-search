import React, { useContext } from 'react';
import Context from '../context/Context';

function OrderControl() {
  const {
    // order,
    // setOrder,
    selectValues,
    random,
  } = useContext(Context);

  return (
    <section>
      <label htmlFor="ordenar">
        <select id="ordenar">
          {selectValues.map((item) => <option key={ random() }>{item}</option>)}
        </select>
      </label>
    </section>
  );
}

export default OrderControl;
