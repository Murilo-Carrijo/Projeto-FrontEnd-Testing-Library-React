import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testando o componente Pokemon.js', () => {
  test('Testando a renderização no nome do pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokemonName = screen.getByText(/pikachu/i);
    expect(pokemonName).toBeInTheDocument();
  });

  test('Testando se o tipo do pokemon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokemonTypeEl = screen.getByTestId('pokemon-type');
    expect(pokemonTypeEl).toHaveTextContent('Electric');
    expect(pokemonTypeEl).toBeInTheDocument();
  });

  test('Testando a renderização do peso do pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,

    );

    const averageWeightEl = screen.getByText(/Average weight:/i);
    expect(averageWeightEl).toBeInTheDocument();
  });

  test('Testando a renderização da imagem do pokémon', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const pokemonImg = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokemonImg.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Testando a navegação do "more details" e a renderização do titulo', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const moreDetailsEl = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsEl).toBeInTheDocument();

    userEvent.click(moreDetailsEl);

    const urlText = customHistory.location.pathname;
    expect(urlText).toBe('/pokemons/25');
  });

  test('Testando a renderização do icone de estrela nos Pokemons Favoritos', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const moreDetailsEl = screen.getByRole('link', { name: /more details/i });
    expect(moreDetailsEl).toBeInTheDocument();

    userEvent.click(moreDetailsEl);

    const checkBoxEl = screen.getByRole('checkbox',
      { name: /pokémon favoritado/i });
    expect(checkBoxEl).toBeInTheDocument();

    userEvent.click(checkBoxEl);

    const starImg = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(starImg.src).toBe('http://localhost/star-icon.svg');
  });
});
