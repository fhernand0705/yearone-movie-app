import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node'; 
import { apiKey } from '../apiKey';
import { MemoryRouter } from 'react-router-dom';

import MovieList from './component';

const endpoint = `http://www.omdbapi.com/?s=avengers&apikey=${apiKey}&page=1`;

const server = setupServer(
    rest.get(endpoint, (req, res, ctx) => {
        return res(ctx.json({ Search: [{ Title: "Avengers: Endgame"}, { Title: "The Avengers"}] }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const setup = () => render(<MemoryRouter><MovieList /></MemoryRouter>);

describe("movie list component", () => {
    beforeEach(() => setup()); 

    test("renders without errors", () => {
        const movieListComponent = screen.getByTestId("movie-list-component");
        expect(movieListComponent).toBeInTheDocument();
    })
    
    test("renders input field", () => {
        const searchField = screen.getByTestId("input-field");
        expect(searchField).toBeInTheDocument();
    })
    
    test("renders submit button", () => {
        const submitBtn = screen.getByTestId("submit-button");
        expect(submitBtn).toBeInTheDocument();
    })

    test("renders form", () => {
        const form = screen.getByTestId("form");
        expect(form).toBeInTheDocument()
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
    beforeEach(() => setup()) 

    test("api call renders list of movies", async () => {
        const movies = screen.getByTestId("movies-container")
        await waitFor(() => expect(movies.children.length).toBeGreaterThan(0))
    })

    test("handles server error", async () => {
        server.use(
            rest.get(endpoint, (req, res, ctx) => {
                return res(ctx.status(500))
            })
        )

        render(
            <MemoryRouter>
                <MovieList />
            </MemoryRouter>
        )

        const error = await waitFor(() => screen.getByTestId("error-message-container"));     
        expect(error).toBeInTheDocument();
    })
})
