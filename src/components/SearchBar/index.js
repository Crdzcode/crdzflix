import React, { useEffect } from 'react';
import './index.css';
import SearchIcon from '@mui/icons-material/Search';

export default(props) => {
    
    return (
        <div className="searchbg">
            <div className="searchbar">
                <SearchIcon style={{color: '#111', fontSize: 24, marginLeft: 6}} />
                <input id="searchbar-input"
                className="searchbar-input" 
                value={(props.value)} 
                onChange={(event)=> props.setSearchValue(event.target.value)}
                placeholder="Filmes, séries e artistas">
                </input>
            </div>
        </div>
    )

}