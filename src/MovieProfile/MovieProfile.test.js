import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { findByTestIdAttr } from '../../testUtils';
import { rest } from 'msw';
import { setupServer } from 'msw/node'; 
import { apiKey } from '../apiKey';

import MovieProfile from './component';
import { MemoryRouter } from 'react-router-dom';

const endpoint = `http://www.omdbapi.com/?i=tt0133093&apikey=${apiKey}`

const server = setupServer(
    rest.get(endpoint, (req, res, ctx) => {
        return res(ctx.json({ Title: "The Matrix" }))
    })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const setup = () => {
    render(
        <MemoryRouter>
            <MovieProfile />
        </MemoryRouter>
    )
} 

describe("profile component", () => {
    beforeEach(() => setup()); 

    test("renders component without errors", () => {
        const profile = findByTestIdAttr("profile-component");
        expect(profile).toBeInTheDocument()
    })

    test("renders movie details container", () => {
        const movieDetails = findByTestIdAttr("movie-details");
        expect(movieDetails).toBeInTheDocument()
    })
})

describe("thumbs up/down icon", () => {
    beforeEach(() => setup())

    test("renders thumbs up as default icon", () => {
        const thumbsUpDefault = findByTestIdAttr("thumbs-up-default");
        expect(thumbsUpDefault).toBeInTheDocument()
    })

    test("renders filled thumbs up icon when clicked", () => {
        const thumbsUpButton = findByTestIdAttr("thumbs-up-button");

        userEvent.click(thumbsUpButton);
        expect(findByTestIdAttr("thumbs-up-filled")).toBeInTheDocument()
    })

    test("renders thumbs down as default icon", () => {
        const thumbsDownDefault = findByTestIdAttr("thumbs-down-default");
        expect(thumbsDownDefault).toBeInTheDocument()
    })

    test("renders filled thumbs down icon when clicked", () => {
        const thumbsDownButton = findByTestIdAttr("thumbs-down-button");

        userEvent.click(thumbsDownButton);
        expect(findByTestIdAttr("thumbs-down-filled")).toBeInTheDocument()
    })
})

describe("mock server for api requests", () => {
    test("renders movie details", async () => {
        setup()

        const movieDetails = findByTestIdAttr("movie-details");
        await waitFor(() => expect(movieDetails.children.length).toBeGreaterThan(0))
    })

    test("handles server errors", async () => {
        server.use(
            rest.get(endpoint, (req, res, ctx) => {
                return res(ctx.status(500))
            })
        )
        
        setup()

        const errMessage = await waitFor(() => findByTestIdAttr("error-message-container"));
        expect(errMessage).toBeInTheDocument()
    })
})
