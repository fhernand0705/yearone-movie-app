import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { checkProps, findByTestIdAttr } from '../../../testUtils';

import MovieListItem from './component';

const movie = {
    Title: 'avengers',
    Poster: 'www',
    Year: 1991,
    imdbID: 1111
}

const setup = () => {
    render(
        <MemoryRouter>
            <MovieListItem movie={movie}/>
        </MemoryRouter>
    )
}

test("renders component without errors", () => {
    setup()
    const listItem = findByTestIdAttr('list-item-component');

    expect(listItem).toBeInTheDocument()
})

describe("check prop types", () => {
    beforeEach(() => setup())

    test("does not throw a warning with expected props", () => {
        checkProps(MovieListItem, movie);
    })

    test("throws a warning with unexpected props", () => {
        checkProps(MovieListItem, { Title: 1, Poster: 0, Year: '1965'})
    })
})

