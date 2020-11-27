import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import MovieListItem from './component';

const setup = () => {
    const movie = {
        Title: 'avengers',
        Poster: 'www',
        Year: 1991,
        imdbID: 1111
    }

    render(
        <MemoryRouter>
            <MovieListItem movie={movie}/>
        </MemoryRouter>
    )
}

test("renders component without errors", () => {
    setup()
    const listItem = screen.getByTestId("list-item-component");

    expect(listItem).toBeInTheDocument()
})