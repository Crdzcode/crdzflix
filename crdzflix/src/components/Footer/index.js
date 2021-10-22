import React from 'react';
import './index.css';
import github from './img/github.png';
import netflix from './img/netflix.png';
import tmdb from './img/tmdb.svg';

export default () => {
    return(
        <footer id="footer">
            <a className="github" target="_blank" href="https://github.com/Crdzcode">
                <img className="github-image" src={github}/>
            </a>
            <a className="netflix" target="_blank" href="https://www.netflix.com/">
                <img className="netflix-image" src={netflix}/>
            </a>
            <a className="tmdb" target="_blank" href="https://www.themoviedb.org/">
                <img className="tmdb-image" src={tmdb}/>
            </a>
        </footer>
    )
}