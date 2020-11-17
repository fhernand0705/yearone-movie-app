import React from 'react'
import { render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node'; 
import { apiKey } from '../apiKey';

import Profile from './component';

const setup = () => render(<Profile />)

describe("profile component", () => {
    beforeEach(() => setup()); 

    test("renders component without errors", () => {
        const profile = screen.getByTestId("profile-component");
        expect(profile).toBeInTheDocument()
    })
})