import checkPropTypes from 'check-prop-types';
import { screen } from '@testing-library/react';

export const findByTestIdAttr = (testId) => {
    return screen.getByTestId(testId)
}

export const checkProps = (component, conformingProps) => {
    const warning = checkPropTypes(
            component.propTypes, conformingProps, 'prop', component.name
        );
    
    expect(warning).toBeUndefined()
}

export const checkUnexpectedProps = (component, nonConformingProps) => {
    const warning = checkPropTypes(
        component.propTypes, nonConformingProps, 'prop', component.name
    );

    expect(warning).not.toBeUndefined()
}