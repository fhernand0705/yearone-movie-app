import * as React from 'react';
import { render, screen } from '@testing-library/react';

import MoviesTable from './component';

test("renders MoviesTable without errors", () => {
    render(<MoviesTable />)
    const moviesTable = screen.getByTestId("movies-table-component");

    expect(moviesTable).toBeInTheDocument()
})