import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testando App.js', () => {
  test('Testando a renderização dos links Home, About e Favorite Pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homePage = screen.getByRole('link', { name: 'Home' });
    const aboutPage = screen.getByRole('link', { name: 'About' });
    const favoritePkemonsPage = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(homePage).toBeInTheDocument();
    expect(aboutPage).toBeInTheDocument();
    expect(favoritePkemonsPage).toBeInTheDocument();
  });

  test('Testando a renderização da pagina de erro', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/xablau');

    const notFoundTextEl = screen.getByText(/Page requested not found/i);
    expect(notFoundTextEl).toBeInTheDocument();
  });
});
