import React, {useRef, useState} from 'react';
import './index.css';
import Tmdb from '../../Tmdb';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default ({title, items, slug, onClick}) => {

    //Checar se o artista tem foto de perfil ou não.
    function checkPerson(){
        let result = items.results[0];
        if(items.results[0] !== undefined){
            if(result.poster_path){
                return false;
            }else if(result.profile_path){
                return true;
            }
        }
        
    }

    //Função que realiza o fetch dos detalhes do que o usuário clicou.
    //Possuí verificações para pegar detalhes de acordo com o tipo de midia.
    async function setFeatured(id, release, profile){
        
        let details;

        if(release!==undefined && profile === undefined){
            details = await Tmdb.getMovieDetails(id, 'movie');
        }
        if(profile!==undefined && release === undefined){
            details = await Tmdb.getArtistDetails(id);
        }
        if(release === undefined && profile === undefined){
            details = await Tmdb.getMovieDetails(id, 'tv');
        }
        
        
        onClick(details);
    }

    const POSTER_BASE = "https://image.tmdb.org/t/p/w300"
    
    const [scrollX, setScrollX] = useState(0);
    var movielistref = useRef();

    const handleLeftArrow = () => {
        let x = scrollX - Math.round(window.innerWidth / 2);
        setScrollX(x);
        movielistref.current.scroll(x,0);
    }

    const handleRightArrow = () => {
        let x = scrollX + Math.round(window.innerWidth / 2);
        setScrollX(x);
        movielistref.current.scroll(x,0);
    }

    return (
        <div className="movieRow">
            <h2>{title}</h2>

            <div data-disable={slug === 'resultados'} className="movieRow-navLeft" onClick={handleLeftArrow}>
                <NavigateBeforeIcon style={{fontSize: 50}} />

            </div>

            <div data-disable={slug === 'resultados'} className="movieRow-navRight" onClick={handleRightArrow}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>

            <div className="movieRow-area">
                <div className="movieRow-list" ref={movielistref} data-breakline={slug === 'resultados'}>

                {(items.results.length > 0, !checkPerson()) && items.results.map((item, key) => {
                    if((item.poster_path!==undefined && item.poster_path!==null)){
                        return(
                            <div key={key} id={item.slug} className="movieRow-item" onClick={() => setFeatured(item.id, item.release_date, item.profile_path)}>
                                <img id={item.id} src={`${POSTER_BASE}${item.poster_path}`} alt={item.original_title} />
                            </div>
                        )
                    }else{
                        return
                    }   
                })}
                {(items.results.length > 0, checkPerson()) && items.results.map((item, key) => {
                    if(item.profile_path!==undefined && item.profile_path!==null){
                        return(
                            <div id={item.id} key={key} id={item.slug} className="movieRow-item" onClick={() => setFeatured(item.id, item.release_date, item.profile_path)}>
                                <img src={`${POSTER_BASE}${item.profile_path}`} />
                            </div>
                        )
                    }else{
                        return
                    }
                    
                })}
                </div>
                
            </div>
        </div>
    )
}