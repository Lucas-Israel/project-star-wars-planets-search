import React from 'react';
import './App.css';
import Filters from './components/Filters';
import OrderControl from './components/OrderControl';
import Table from './components/Table';
import Provider from './context/Provider';

function App() {
  return (
    <Provider>
      <Filters />
      <br />
      <OrderControl />
      <Table />
    </Provider>
  );
}

export default App;
