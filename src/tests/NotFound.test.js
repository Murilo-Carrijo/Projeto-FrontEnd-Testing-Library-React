import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import NotFound from '../components/NotFound';

describe('Testando a renderização da pagina Not Found', () => {
  test('Testando se o texto Requested not Foun é rendereizado', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );

    const headingEl = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(headingEl).toBeInTheDocument();
  });

  test('Testando se a imgem do Pokemon é renderizada', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <NotFound />
      </Router>,
    );

    const notFoundImag = screen.getByRole('img',
      { name: /Pikachu crying because the page requested was not found/i });
    expect(notFoundImag.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
