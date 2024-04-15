import React from 'react';
import { useState } from 'react';
import './Header.css';
import { BsSearch } from 'react-icons/bs';


function Header({handleLocation}) {
    const [location, setLocation] = useState('')
    const handleInput = (e) => {
        setLocation(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleLocation(location)
        setLocation('')
    }
    return (
        <div className='header'>
            <form className="search" onSubmit={handleSubmit}>
                <input
                    className='search-input'
                    type='text'
                    value={location}
                    placeholder='Search Location...'
                    onChange={handleInput}
                ></input>
            </form>
        </div>
    )
}

export default Header