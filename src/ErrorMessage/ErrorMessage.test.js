import { render } from '@testing-library/react';
import { findByTestIdAttr, checkProps } from '../../testUtils';
import checkPropTypes from '../../testUtils';

import ErrorMessage from './component';

const error = "network error";

const setup = () => {
    return render(<ErrorMessage error={error} />)
}

test("renders component without error", () => {
    setup()

    const component = findByTestIdAttr("error-message-container")
    expect(component).toBeInTheDocument()
})

describe("check prop types", () => {
    beforeEach(() => setup())

    test("does not throw a warning with expected props", () => {
        checkProps(ErrorMessage, error)
    })

    test("throws a warning with unexpected props", () => {
        const unexpectedProp = 10;
        const warning = checkPropTypes(ErrorMessage.propTypes, unexpectedProp, 'prop', ErrorMessage.name)

        expect(warning).not.toBeUndefined()
    })
})