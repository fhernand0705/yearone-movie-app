import * as React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import PropTypes from 'prop-types'; 

const ErrorMessage = ({ error }) => {
    return (
            <div 
                data-testid="error-message-container" 
                className="flex justify-center my-20"
            >
                <div className="
                    flex 
                    text-red-400 
                    text-xl 
                    bg-red-200 
                    border-solid 
                    border-4 
                    border-red-500 
                    border-opacity-25 
                    rounded-lg 
                    space-x-1 
                    p-4">
                    <span><FiAlertCircle /></span>
                    <span>{`${error}. Try again later!`}</span>
                </div>
            </div>
    )
}

ErrorMessage.propTypes = {
    error: PropTypes.string.isRequired
}

export default ErrorMessage; 