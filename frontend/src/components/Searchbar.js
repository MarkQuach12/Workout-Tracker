import { useWorkoutsContext } from '../hooks/useWorkoutsContext'
import { useState } from 'react'

const Searchbar = ({ setSearchTerm }) => {
    const handleInputChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <input id = 'searchInput' type = "text" placeholder = "Search here..." onChange={handleInputChange}/>
    )
}

export default Searchbar