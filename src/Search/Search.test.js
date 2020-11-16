import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node'; 
import { apiKey } from '../apiKey'

import Search from './component';

const setup = () => render(<Search />);

const server = setupServer(
    rest.get('http://www.omdbapi.com/?t=avengers:+endgame&apikey=a2114aab', (req, res, ctx) => {
        return res(ctx.json({ Title: "Avengers: Endgame" }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe("search component", () => {
    beforeEach(() => setup()); 

    test("renders without errors", () => {
        const searchComponent = screen.getByTestId("search-component");
        expect(searchComponent).toBeInTheDocument();
    })
    
    test("renders input field", () => {
        const searchField = screen.getByTestId("input-field");
        expect(searchField).toBeInTheDocument();
    })
    
    test("renders submit button", () => {
        const submitBtn = screen.getByTestId("submit-button");
        expect(submitBtn).toBeInTheDocument();
    })
})


describe("input field", () => {
    beforeEach(() => setup());

    test("default state value is an empty string", () => {
        const searchField = screen.getByTestId("input-field");
        expect(searchField).toHaveValue('');
    })

    test("input field value updates upon onchange event", () => {
        const searchField = screen.getByTestId("input-field");
        userEvent.type(searchField, "movie")

        expect(searchField).toHaveValue("movie");
    })
})

describe("mock server for api requests", () => {
    test("loads and renders movie title", async () => {
        setup()
        screen.getByTestId("movie-title")    
        await waitFor(() => expect(screen.getByTestId("movie-title").textContent).toBe("Avengers: Endgame"))
    })
})