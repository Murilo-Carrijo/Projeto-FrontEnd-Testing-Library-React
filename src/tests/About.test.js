import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { About } from '../components';

describe('Testando o componente About.js', () => {
  test('Testar renderização da descrição do Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const aboutTextEl = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutTextEl).toBeInTheDocument();
  });

  test('Testando se a página possui um heading h2 com o texto About Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const headingEl = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(headingEl).toBeInTheDocument();
  });

  test('Testando a renderização da imagem do Pokédex', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <About />
      </Router>,
    );

    const pokedexImg = screen.getByRole('img', { name: 'Pokédex' });
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
