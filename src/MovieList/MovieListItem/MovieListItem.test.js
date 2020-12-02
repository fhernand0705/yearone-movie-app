import * as React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { checkProps, checkUnexpectedProps, findByTestIdAttr } from '../../../testUtils';

import MovieListItem from './component';

const defaultProps = {
    movie: {
        Title: 'avengers',
        Poster: 'www',
        Year: '1991',
        imdbID: '1111'
    } 
}

const setup = () => {
    render(
        <MemoryRouter>
            <MovieListItem movie={defaultProps}/>
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
        checkProps(MovieListItem, defaultProps);
    })

    test("throws a warning with unexpected props", () => {
        checkUnexpectedProps(
            MovieListItem, 
            {Title: 10, Poster: 1, Year: 1990, imdbID: 0}
        )
    })
})

