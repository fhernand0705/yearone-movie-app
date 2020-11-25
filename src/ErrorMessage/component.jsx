import * as React from 'react';
import { FiAlertCircle } from 'react-icons/fi';


const ErrorMessage = ({ error }) => {
    return (
            <div 
                data-testid="error-message-container" 
                className="flex justifty-center my-20"
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

export default ErrorMessage; 