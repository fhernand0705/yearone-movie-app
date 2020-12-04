import * as React from 'react'; 
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';


const MovieSearchForm = ({ handleSubmit, inputValue, setInputValue }) => {
    return (
        <form 
            onSubmit={handleSubmit} 
            data-testid="form" 
            className="flex justify-center my-22"
        >
            <input 
                type="text" 
                value={inputValue} 
                data-testid="input-field"
                onChange={(e) => setInputValue(e.target.value)}
                className="
                    border 
                    border-opacity-5 
                    shadow-md 
                    rounded-l-lg
                    mx-0 
                    border-opacity-25 
                    p-1 
                    w-60"
                placeholder="Search movies..."
            />
            <button 
                type="submit" 
                data-testid="submit-button" 
                className="
                    bg-indigo-500 
                    rounded-r-lg
                    p-2 
                    text-gray-200 
                    hover:bg-indigo-700"
            >
            <AiOutlineSearch className="text-2xl my-1 text-gray-400" />
            </button>
        </form>
    )
}

MovieSearchForm.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    setInputValue: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired
}

export default MovieSearchForm; 