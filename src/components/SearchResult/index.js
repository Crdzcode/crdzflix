import React, { useEffect, useState } from 'react';
import MovieRow from '../MovieRow';
import Tmdb from '../../Tmdb';
import './index.css';

export default({movielist, searchValue, searchResults, setSearchResults, onUpdate}) => {
    
    //Declaração de variável state para setar os filmes que vão aparecer na tela de resultados.
    const [movies, setMovies] = useState([]);

    //Hook para atualizar a fetch da API de acordo com o que está sendo digitado na barra de pesquisa.
    useEffect(async() => {

        //Verificação de segurança para ver se tem algum filme com o valor da pesquisa
        if(await Tmdb.getByName(searchValue)){
            //Setando os resultados da pesquisa de acordo com o que foi pesquisado.
            setSearchResults(await Tmdb.getByName(searchValue));
        }

        //Verificação de segurança caso não tenhamos nenhum resultado de pesquisa
        if(searchResults.length === 0){
            return
        }

        //Verificação de segurança para caso dê algum erro no fetch da API
        if(searchResults[0].items.errors === undefined){
            setMovies(searchResults);
        }
        
    }, [searchValue])

    //Hook para setar os filmes que aparecem nas rows do SearchResult
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