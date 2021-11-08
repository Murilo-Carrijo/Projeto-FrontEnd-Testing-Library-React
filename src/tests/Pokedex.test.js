import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';

describe('Testando as renderizações do componente Pokedex', () => {
  const pokemonType = pokemons.map(({ type }) => type)
    .filter((mappedType, index, types) => types.indexOf(mappedType) === index);

  const getPokemonsByType = (type) => pokemons
    .filter((pokemon) => pokemon.type === type);

  test('Testando a renderização de um h2 com o texto Encountered pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const headingEl = screen.getByRole('heading',
      { level: 2, name: /Encountered pokémons/i });
    expect(headingEl).toBeInTheDocument();
  });

  test('Testando a o botão Próximo pokémon e a renderização do pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    userEvent.click(nextPokemonButton);

    const foundPokemons = screen.getAllByTestId('pokemon-name');
    expect(foundPokemons).toHaveLength(1);
  });

  test('Testando se os pokémons são exibidos na sequencia de cadastro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    pokemons.forEach((pokemon) => {
      const altText = screen.getByAltText(`${pokemon.name} sprite`);
      expect(altText).toBeInTheDocument();
      userEvent.click(nextPokemonButton);
    });
  });

  test('Testando o retorno para o primeiro pokémom se atingir o fim da lista', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toBeInTheDocument();

    pokemons.forEach(() => userEvent.click(nextPokemonButton));
    const firstPokemon = screen.getByAltText(/pikachu sprite/i);
    expect(firstPokemon).toBeInTheDocument();
  });

  test('Testando a renderização dos botões para cada tipo de pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    pokemonType.forEach((type) => {
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toBeInTheDocument();
    });

    const filterButtonEl = screen.getAllByTestId('pokemon-type-button');
    expect(filterButtonEl).toHaveLength(pokemonType.length);
  });

  test('Testando a renderização do pokémon selecionado', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const typButtonEl = screen.getAllByTestId('pokemon-type-button');
    expect(typButtonEl).toHaveLength(pokemonType.length);

    pokemonType.forEach((type) => {
      const filteredPokemons = getPokemonsByType(type);
      const buttonType = screen.getByRole('button', { name: type });
      expect(buttonType).toBeInTheDocument();

      userEvent.click(buttonType);

      const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(nextPokemonButton).toBeInTheDocument();

      filteredPokemons.forEach((pokemon) => {
        const altText = screen.getByAltText(`${pokemon.name} sprite`);
        expect(altText).toBeInTheDocument();
        const buttonAllEl = screen.getByRole('button', { name: /all/i });
        expect(buttonAllEl).toBeInTheDocument();
        userEvent.click(nextPokemonButton);
      });
    });
  });

  test('Testando a renderização do botão limpar filtro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const buttonAllEl = screen.getByRole('button', { name: /all/i });
    expect(buttonAllEl).toBeInTheDocument();

    const electricButtonEl = screen.getByRole('button', { name: /electric/i });
    expect(electricButtonEl).toBeInTheDocument();

    userEvent.click(electricButtonEl);

    const nextPokemonButton = screen.getByRole('button', { name: /Próximo pokémon/i });
    expect(nextPokemonButton).toBeDisabled();

    userEvent.click(buttonAllEl);
    expect(buttonAllEl).not.toBeDisabled();
  });
});

// Lógica para a resolução do requisito retirada do código do colega Antonio Carlos
// link: https://github.com/tryber/sd-015-b-project-react-testing-library/pull/13/files
