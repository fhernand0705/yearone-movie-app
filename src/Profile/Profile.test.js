import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node'; 
import { apiKey } from '../apiKey';

import Profile from './component';
import { MemoryRouter } from 'react-router-dom';

const server = setupServer(
    rest.get(`http://www.omdbapi.com/?i=tt0133093&apikey=${apiKey}`, (req, res, ctx) => {
        return res(ctx.json({ Title: "The Matrix" }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const setup = () => {
    render(
        <MemoryRouter>
            <Profile />
        </MemoryRouter>
    )
} 

describe("profile component", () => {
    beforeEach(() => setup()); 

    test("renders component without errors", () => {
        const profile = screen.getByTestId("profile-component");
        expect(profile).toBeInTheDocument()
    })

    test("renders movie details container", () => {
        const movieDetails = screen.getByTestId("movie-details");
        expect(movieDetails).toBeInTheDocument()
    })
})

describe("mock server for api requests", () => {
    beforeEach(() => setup())

    test("renders movie details", async () => {
        const movieDetails = screen.getByTestId("movie-details");
        await waitFor(() => expect(movieDetails.children.length).toBeGreaterThan(0))
    })
})