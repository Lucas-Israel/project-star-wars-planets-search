import React from 'react';
import { findByText, render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import fetchMock from './Mocks/fetchMock';

describe('Testing the App', () => {
  test('The App renders correctly.', () => {
    render(<App />);
    const linkElement = screen.getByText(/Filtrar\w*./i);
    expect(linkElement).toBeInTheDocument();
  });

  test('Name filter input works correctly and filters the results by name regardless of capital letters', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(fetchMock),
    }));
  
    render(<App />);

    let planetTatooine = await screen.findByText('Tatooines');
    const planetKamino = await screen.findByText('Kamino');
    expect(planetTatooine.innerHTML).toBe('Tatooines');
    expect(planetKamino.innerHTML).toBe('Kamino');

    const filterInput = screen.getByTestId('name-filter')

    userEvent.type(filterInput, 'Oo');

    planetTatooine = await screen.findByText('Tatooines');
    expect(planetTatooine).toBeInTheDocument();
    expect(planetKamino).not.toBeInTheDocument();

  })

  test("Using filters, should remove items that doesn't fit the criteria, using 'Remover filtros' button should remove all filters", async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(fetchMock),
    }));
  
    render(<App />);

    let columnFilter = await screen.findByTestId('column-filter');
    expect(columnFilter.value).toBe('population');
    userEvent.selectOptions(columnFilter, 'diameter');
    expect(columnFilter.value).toBe('diameter');
    const operadorFilter = screen.getByTestId('comparison-filter');
    expect(operadorFilter.value).toBe('maior que');

    let planetTatooine = await screen.findByText('Tatooines');
    expect(planetTatooine.innerHTML).toEqual('Tatooines');

    let planetAlderaan = await screen.findByText('Alderaan');
    expect(planetAlderaan.innerHTML).toBe('Alderaan');

    const valueFilter = screen.getByTestId('value-filter');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '12000');

    let planetKamino = await screen.findByText('Kamino');
    expect(planetKamino.innerHTML).toEqual('Kamino');

    const buttonFilter = screen.getByTestId('button-filter');
    userEvent.click(buttonFilter);

    columnFilter = await screen.findByTestId('column-filter');
    expect(columnFilter.value).toBe('population');

    planetAlderaan = await screen.findByText('Alderaan');
    expect(planetAlderaan.innerHTML).toBe('Alderaan');
    expect(planetTatooine).not.toBeInTheDocument();
    expect(planetKamino).not.toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'rotation_period')
    expect(columnFilter.value).toBe('rotation_period');

    userEvent.selectOptions(operadorFilter, 'igual a');
    expect(operadorFilter.value).toBe('igual a')

    userEvent.clear(valueFilter);
    expect(valueFilter).toHaveValue(null)
    userEvent.type(valueFilter, '12');
    expect(valueFilter).toHaveValue(12)

    userEvent.click(buttonFilter);

    expect(planetAlderaan).not.toBeInTheDocument();
    expect(planetTatooine).not.toBeInTheDocument();

    const planetBespin = await screen.findByText('Bespin');
    expect(planetBespin.innerHTML).toBe('Bespin');

    const filterDelButton = await screen.findAllByText('deletar')

    userEvent.click(filterDelButton[1]);

    planetKamino = await screen.findByText('Kamino');
    expect(planetKamino.innerHTML).toEqual('Kamino');
    
    const removeFiltersBtn = screen.getByTestId('button-remove-filters');
    expect(removeFiltersBtn.innerHTML).toBe('Remover filtros');

    userEvent.click(removeFiltersBtn);

    planetTatooine = await screen.findByText('Tatooines');
    expect(planetTatooine.innerHTML).toBe('Tatooines');

    columnFilter = await screen.findByTestId('column-filter');
    expect(columnFilter.value).toBe('population');

    userEvent.selectOptions(operadorFilter, 'menor que');
    expect(operadorFilter.value).toBe('menor que');

    userEvent.clear(valueFilter);
    expect(valueFilter).toHaveValue(null);
    userEvent.type(valueFilter, '1200');
    expect(valueFilter).toHaveValue(1200);

    userEvent.click(buttonFilter);

    const planetYav = await screen.findByText('Yavin IV');
    expect(planetYav.innerHTML).toBe('Yavin IV')
    expect(planetTatooine).not.toBeInTheDocument();
  })

  test('Order filter should order each item correctly', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(fetchMock),
    }));
  
    render(<App />);

    let columnSort = await screen.findByTestId('column-sort');
    expect(columnSort.value).toBe('population');
    const radioDesc = screen.getByTestId('column-sort-input-desc');
    const radioAsc = screen.getByTestId('column-sort-input-asc');
    const sortBtn = screen.getByTestId('column-sort-button');

    userEvent.selectOptions(columnSort, 'diameter');
    userEvent.click(radioDesc);
    userEvent.click(sortBtn);

    let planets = await screen.findAllByTestId('planet-name');

    expect(planets[0].innerHTML).toBe('Bespin');
    expect(planets[1].innerHTML).toBe('Kamino');
    expect(planets[2].innerHTML).toBe('Alderaan');
    expect(planets[9].innerHTML).toBe('Endor');

    userEvent.selectOptions(columnSort, 'rotation_period');
    userEvent.click(radioAsc);
    userEvent.click(sortBtn);

    planets = await screen.findAllByTestId('planet-name');

    expect(planets[0].innerHTML).toBe('Bespin');
    expect(planets[1].innerHTML).toBe('Endor');
    expect(planets[2].innerHTML).toBe('Tatooines');
    expect(planets[9].innerHTML).toBe('Kamino');
  })
})
