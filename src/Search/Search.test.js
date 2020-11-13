import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import Search from './component';

const setup = () => render(<Search />);

test("renders without errors", () => {
    setup(); 
    const searchComponent = screen.getByTestId("search-component");
    expect(searchComponent).toBeInTheDocument();
})

test("renders input field", () => {
    setup(); 
    const searchField = screen.getByTestId("input-field");
    expect(searchField).toBeInTheDocument();
})

test("renders submit button", () => {
    setup(); 
    const submitBtn = screen.getByTestId("submit-button");
    expect(submitBtn).toBeInTheDocument();
})

describe("input field", () => {
    beforeEach(() => setup());

    test("default state value is an empty string", () => {
        const searchField = screen.getByTestId("input-field");
        expect(searchField).toHaveValue('');
    })

    test("input field value updates upon onchange event", () => {
        const searchField = screen.getByTestId("input-field");
        userEvent.type(searchField, "movie");

        expect(searchField).toHaveValue("movie");
    })
})