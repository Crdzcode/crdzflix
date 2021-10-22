import React, { useState } from 'react';
import './index.css';

export default ({item}) => {
    const POSTER_BASE = "https://image.tmdb.org/t/p/original"
    const [backgroundPath, setBackgroundPath] = useState(null);

    let firstDate = new Date(item.first_air_date);
    let movieDate = new Date(item.release_date);
    let personDate = new Date(item.birthday);
    let today = new Date();

    let genres = [];
    for(let i in item.genres){
        genres.push(item.genres[i].name);
    }

    function checkMediaType(){
        if(item.budget!==undefined){
            if(item.backdrop_path!==backgroundPath){
                setBackgroundPath(item.backdrop_path);
            }
            return('movie')
        }else if(item.biography!==undefined){
            if(item.profile_path!==backgroundPath){
                setBackgroundPath(item.profile_path);
            }
            return('person');
            
        }else{
            if(item.backdrop_path!==backgroundPath){
                setBackgroundPath(item.backdrop_path);
            }
            return('tv');
            
        }
    }

    return(
        
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(${POSTER_BASE}${backgroundPath})`,
        }}>
            {checkMediaType() === 'tv' &&
                <div className="featured-vertical">
                    <div className="featured-horizontal">
                        <div className="featured-name">{item.name}</div>
                        <div className="featured-info">
                            <div className="featured-points">{item.vote_average * 10}% relevante</div>
                            <div className="featured-year">{firstDate.getFullYear()}</div>
                            <div className="featured-seasons">{item.number_of_seasons} temporada{item.number_of_seasons !== 1 ? 's' : ''}</div>
                        </div>
                        <div className="featured-description">{item.overview}</div>
                        <div className="featured-buttons">
                            <a href="/" className="featured-watchbutton">► Assistir</a>
                            <a href="/" className="featured-mylistbutton">+ Minha Lista</a>
                        </div>
                        <div className="featured-genres"><strong>Gêneros:</strong> {genres.join(', ')}</div>
                    </div>
                </div>
            }
            {checkMediaType() === 'movie' &&
                <div className="featured-vertical">
                    <div className="featured-horizontal">
                        <div className="featured-name">{item.title}</div>
                        <div className="featured-info">
                            <div className="featured-points">{item.vote_average * 10}% relevante</div>
                            <div className="featured-year">{movieDate.getFullYear()}</div>
                        </div>
                        <div className="featured-description">{item.overview}</div>
                        <div className="featured-buttons">
                            <a href="/" className="featured-watchbutton">► Assistir</a>
                            <a href="/" className="featured-mylistbutton">+ Minha Lista</a>
                        </div>
                        <div className="featured-genres"><strong>Gêneros:</strong> {genres.join(', ')}</div>
                    </div>
                </div>
            }
            {checkMediaType() === 'person' &&
                <div className="featured-vertical">
                    <div className="featured-horizontal">
                        <div className="featured-name">{item.name}</div>
                        <div className="featured-info">
                            <div className="featured-points"><strong>Popularidade: </strong>{item.popularity}</div>
                            <div className="featured-year">{today.getFullYear() - personDate.getFullYear()} anos</div>
                        </div>
                        <div className="featured-description">{item.biography}</div>
                        <div className="featured-genres"><strong>Conhecida por:</strong> {item.known_for_department}</div>
                    </div>
                </div>
            }
            
        </section>
    )
}