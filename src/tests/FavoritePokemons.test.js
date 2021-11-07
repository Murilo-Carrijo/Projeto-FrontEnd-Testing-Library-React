import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testanando a renderizações da pagina Favorite Pokemons', () => {
  test('Testando se a pagina renderiza a mensagem No favorites pokemon found', () => {
    render(
      <MemoryRouter>
        <FavoritePokemons />
      </MemoryRouter>,
    );

    const noFavoritePokemon = screen.getByText('No favorite pokemon found');
    expect(noFavoritePokemon).toBeInTheDocument();
  });

  test('Testando a renderização dos Pokemons favoritos', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    const moreDetailsEl = screen.getByRole('link', { name: 'More details' });
    expect(moreDetailsEl).toBeInTheDocument();

    userEvent.click(moreDetailsEl);

    const checkBoxEl = screen.getByRole('checkbox');
    expect(checkBoxEl).toBeInTheDocument();

    userEvent.click(checkBoxEl);

    customHistory.push('/favorites');
    const moreDetails = screen.getAllByRole('link', { name: 'More details' });
    expect(moreDetails.length).toBe(1);
  });
});

// Para concluir a segunda etapa do requisito segui a lógica do colega Vinivius Santana.
// https://github.com/tryber/sd-015-b-project-react-testing-library/pull/3/files
