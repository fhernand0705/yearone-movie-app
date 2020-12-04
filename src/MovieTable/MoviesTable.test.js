import * as React from 'react';
import { render } from '@testing-library/react';
import { findByTestIdAttr } from '../../testUtils';

import MovieTable from './component';

const setup = () => {
    return render(<MovieTable />)
}

test("renders MoviesTable without errors", () => {
    setup()
    const moviesTable = findByTestIdAttr("movies-table-component");

    expect(moviesTable).toBeInTheDocument()
})

test("renders message when data is not available", () => {
    setup()
    const message = findByTestIdAttr("no-data-message")

    expect(message).toBeInTheDocument()
})

test("renders back button without error", () => {
    setup()
    const backButton = findByTestIdAttr("back-button");

    expect(backButton).toBeInTheDocument();
})