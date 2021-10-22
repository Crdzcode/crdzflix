import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb.js';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import SearchResult from './components/SearchResult';


export default () => {

  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);
  const [focused, setFocused] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [rowData, setRowData] = useState([]);



  useEffect(() => {
    const load = async () => {
      let list = await Tmdb.getHomeList();
      setMovieList(list);
      console.log(list);

      let featured = list.filter(i=>i.slug === 'originais');
      let random = Math.floor(Math.random() * (featured[0].items.results.length - 1))
      let chosen = featured[0].items.results[random];

      let chosenDetails = await Tmdb.getMovieDetails(chosen.id, 'tv');

      setFeaturedData(chosenDetails);



      
      
    }

    load();
  }, [])

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

  useEffect(() => {
    let inputSearch = document.getElementById("searchbar-input");
    let searchResult = document.getElementById("searchresult");
    let footer = document.getElementById("footer");
    let lists = document.getElementById("lists");
    inputSearch.onfocus = function(){
      setFocused(true);
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
      setFocused(false);
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

      
      <SearchResult movielist={movieList} searchValue={searchValue} searchResults={searchResults} setSearchResults={setSearchResults} onUpdate={(detail) => setFeaturedData(detail)} />
      

        {featuredData &&
          <FeaturedMovie item={featuredData} />
        }

        <section id="lists" className="lists">
          {movieList.map((item, key) => (
            <div>
              <MovieRow key={key} title={item.title} items={item.items} slug={item.slug} onClick={(detail) => setFeaturedData(detail)} />
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