import * as React from 'react'; 

const Form = ({ handleSubmit, children }) => {
    return (
        <form 
            onSubmit={handleSubmit} 
            data-testid="form" 
            className="flex justify-center my-12"
        >
            {children}  
        </form>
    )
}

export default Form; 