import * as React from 'react';
import { render, screen } from '@testing-library/react';

import MovieTable from './component';

test("renders MoviesTable without errors", () => {
    render(<MovieTable />)
    const moviesTable = screen.getByTestId("movies-table-component");

    expect(moviesTable).toBeInTheDocument()
})