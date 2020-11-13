import React, { useState } from 'react';


const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div data-testid="search-component">
            <input 
                type="text" 
                value={searchTerm} 
                data-testid="input-field"
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button data-testid="submit-button">Search</button>
        </div>
    )
}

export default Search; 

