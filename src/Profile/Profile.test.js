import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

describe("thumbs up icon", () => {
    beforeEach(() => setup())

    test("renders thumbs up as default icon", () => {
        const thumbsUpClear = screen.getByTestId("thumbs-up-clear");
        expect(thumbsUpClear).toBeInTheDocument()
    })

    test("renders filled thumbs up icon when clicked", () => {
        const thumbsUpClear = screen.getByTestId("thumbs-up-clear");

        userEvent.click(thumbsUpClear);
        expect(screen.getByTestId("thumbs-up-filled")).toBeInTheDocument()
    })
})

describe("mock server for api requests", () => {
    beforeEach(() => setup())

    test("renders movie details", async () => {
        const movieDetails = screen.getByTestId("movie-details");
        await waitFor(() => expect(movieDetails.children.length).toBeGreaterThan(0))
    })

    // test => handles server errors
})

describe("thumbs up counter value", () => {
    beforeEach(() => setup())

    test("counter state has a default value of 0", () => {
        const counter = screen.getByTestId("counter")
        expect(counter).toHaveTextContent(0)
    })

    test("clicking thumbs up increments counter state", () => {
        const counter = screen.getByTestId("counter");
        const thumbsUpClear = screen.getByTestId("thumbs-up-clear");

        userEvent.click(thumbsUpClear);
        expect(counter).toHaveTextContent(1);
    })
})