import { render } from '@testing-library/react';
import { checkProps, checkUnexpectedProps, findByTestIdAttr } from '../../testUtils';

import MovieSearchForm from './component';

const handleSubmit = jest.fn();
const setInputValue = jest.fn();
const inputValue = 'avengers';

const setup = () => {
    return render(
        <MovieSearchForm 
            handleSubmit={handleSubmit}
            setInputValue={setInputValue}
            inputValue={inputValue} 
        />
    )
}

test("renders component without errors", () => {
    setup()

    const component = findByTestIdAttr("form")
    expect(component).toBeInTheDocument()
})

describe("check prop types", () => {
    beforeEach(() =>  setup())

    const defaultProps = {
        handleSubmit: jest.fn(),
        setInputValue: jest.fn(),
        inputValue: 'avengers'
    }

    test("does not throw with expected props", () => {
        checkProps(MovieSearchForm, defaultProps)
    })

    test("throws a warning with unexpected props", () => {
        checkUnexpectedProps(MovieSearchForm, {})
    })
})