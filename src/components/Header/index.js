import React, {useState} from 'react';
import './index.css';
import logo from './img/crdzflix.png';
import avatar from './img/avatar.png';
import SearchBar from '../SearchBar';

export default ({black, searchValue, setSearchValue}) => {

    return(
        <header className={black ? 'black' : ''}>
            <div className="header-logo">
                <a href="/">
                    <img src={logo} alt="logo" />
                </a>
            </div>
            <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
            <div className="header-user">
                <a href="/">
                    <img src={avatar} alt="avatar" />
                </a>
            </div>
        </header>
    );
}