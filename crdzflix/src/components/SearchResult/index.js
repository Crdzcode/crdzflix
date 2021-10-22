import React, { useEffect, useState } from 'react';
import MovieRow from '../MovieRow';
import Tmdb from '../../Tmdb';
import './index.css';

export default({movielist, searchValue, searchResults, setSearchResults, onUpdate}) => {
    
    const [movies, setMovies] = useState([]);

    useEffect(async() => {

        if(await Tmdb.getByName(searchValue)){
            setSearchResults(await Tmdb.getByName(searchValue));
        }

        console.log(searchResults);

        if(searchResults.length === 0){
            return
        }

        if(searchResults[0].items.errors === undefined){
            setMovies(searchResults);
        }
        
    }, [searchValue])

    useEffect(() => {
        setMovies(movielist);
    }, [movielist])

    return(
        <div id="searchresult" className="searchresult">
            <div className="searchrows">
                {movies.map((item, key) => {
                    return(
                        <div className="defaultrows">
                            {(item.slug === 'filmesemalta' || item.slug === 'seriesemalta' || item.slug === 'artistas' || item.slug === 'resultados') &&
                                <MovieRow key={key} title={item.title} items={item.items} slug={item.slug} onClick={onUpdate}/>
                            }
                        </div>
                    )
                    
                })}
          </div>
        </div>
    )
}