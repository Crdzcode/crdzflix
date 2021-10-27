import React from 'react';
import './index.css';
import SearchIcon from '@mui/icons-material/Search';

export default(props) => {
    
    return (
        <div className="searchbg">
            <div className="searchbar">
                <SearchIcon style={{color: '#111', fontSize: 24, marginLeft: 6}} />
                <input id="searchbar-input"
                className="searchbar-input"
                //Setando valor para a variável searchValue, mantendo o que foi pesquisado na tela de result. 
                value={(props.searchValue)}
                //Evento que toda vez em que atualizamos o valor do input, a função setSearchValue é chamada, setando o valor da variável que armazena o que foi pesquisado.
                onChange={(event)=> props.setSearchValue(event.target.value)}
                placeholder="Filmes, séries e artistas">
                </input>
            </div>
        </div>
    )

}