//Importação dos componentes, arquivo de requisição, e css
import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb.js';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchResult from './components/SearchResult';


export default () => {

  //Declaração das variáveis de state
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);



  //Hook para carregar informações da API para enviá-las para os componentes.
  useEffect(() => {
    const load = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      let featured = list.filter(i=>i.slug === 'originais');
      let random = Math.floor(Math.random() * (featured[0].items.results.length - 1))
      let chosen = featured[0].items.results[random];

      let chosenDetails = await Tmdb.getMovieDetails(chosen.id, 'tv');

      setFeaturedData(chosenDetails);
    }

    load();
  }, [])

  //Hook para alterar CSS do header, colocando um fundo preto quando o usuário scrolla para baixo.
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 12){
        setBlackHeader(true);
      } else{
        setBlackHeader(false);
      }
    }

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  //Hook para alterar o CSS do componenente "SearchResult", tornando o visível quando o usuário clica na barra de pesquisa.
  useEffect(() => {
    let inputSearch = document.getElementById("searchbar-input");
    let searchResult = document.getElementById("searchresult");
    let footer = document.getElementById("footer");
    let lists = document.getElementById("lists");
    inputSearch.onfocus = function(){
      searchResult.style.opacity = 1;
      searchResult.style.zIndex = 101;
      lists.style.opacity = 0;
      footer.style.opacity = 0;
      setTimeout(function(){
        lists.style.display = 'none';
        footer.style.display = 'none';
      }, 500)
    }
    inputSearch.onblur = function(){
      searchResult.style.opacity = 0;
      searchResult.style.zIndex = -100;
      lists.style.opacity = 1;
      lists.style.display = 'block';
      footer.style.opacity = 1;
      footer.style.display = 'flex';
    }

  }, [])

  return(
    <main className="page">
      
      <Header black={blackHeader} searchValue={searchValue} setSearchValue={setSearchValue} />

      
      <SearchResult 
      movielist={movieList} 
      searchValue={searchValue} 
      searchResults={searchResults} 
      setSearchResults={setSearchResults}
      onUpdate={(detail) => setFeaturedData(detail)} />
      

        {featuredData &&
          <FeaturedMovie item={featuredData} />
        }

        <section id="lists" className="lists">
          {movieList.map((item, key) => (
            <div>
              <MovieRow 
              key={key} 
              title={item.title} 
              items={item.items} 
              slug={item.slug}
              //Função que coleta detalhes do que o usuário clicou, e seta os dados do Featured para esses detalhes.
              onClick={(detail) => setFeaturedData(detail)} />
            </div>
          ))}
        </section>



      <Footer />
          {movieList.length <= 0 &&
            <div className="loading">
              <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Loading" />
            </div>
          }
    </main>
  )
}