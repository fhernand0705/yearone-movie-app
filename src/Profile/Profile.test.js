import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { rest } from 'msw';
import { setupServer } from 'msw/node'; 
import { apiKey } from '../apiKey';

import Profile from './component';
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

    test("handles server errors", async () => {
        server.use(
            rest.get(endpoint, (req, res, ctx) => {
                return res(ctx.status(500))
            })
        )
        
        render(
            <MemoryRouter>
                <Profile />
            </MemoryRouter>
        )

        const errMessage = await waitFor(() => screen.getByTestId("error-message"));
        expect(errMessage).toBeInTheDocument()
    })
})

// describe("thumbs up count value", () => {
//     beforeEach(() => setup())

//     test("count state has a default value of 0", () => {
//         const counter = screen.getByTestId("count")
//         expect(counter).toHaveTextContent(0)
//     })

//     test("clicking thumbs up increments count state", () => {
//         const counter = screen.getByTestId("count");
//         const thumbsUpClear = screen.getByTestId("thumbs-up-clear");

//         userEvent.click(thumbsUpClear);
//         expect(counter).toHaveTextContent(1);
//     })
// })