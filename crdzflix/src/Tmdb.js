const API_KEY = '6ccf7990e6da5a7955f2e1354efa6ad7';
const API_BASE = 'https://api.themoviedb.org/3';
const FETCH_LANGUAGE = 'pt-BR';

const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_BASE}${endpoint}`);
    const json = await req.json();
    return json;
}

export default {
    getHomeList: async() => {
        return [
            {
                slug: 'originais',
                title: 'Originais do Crdzflix',
                items: await basicFetch(`/discover/tv?with_networks=213&language=${FETCH_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'recomendados',
                title: 'Recomendados para você',
                items: await basicFetch(`/trending/all/week?language=${FETCH_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'filmesemalta',
                title: 'Filmes em alta',
                items: await basicFetch(`/movie/top_rated?language=${FETCH_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'seriesemalta',
                title: 'Séries em alta',
                items: await basicFetch(`/tv/top_rated?api_key=${API_KEY}&language=${FETCH_LANGUAGE}`)
            },
            {
                slug: 'acao',
                title: 'É hora de ação',
                items: await basicFetch(`/discover/movie?with_genres=28&language=${FETCH_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'terror',
                title: 'Terror',
                items: await basicFetch(`/discover/movie?with_genres=27&language=${FETCH_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'comedia',
                title: 'Morra de dar risada',
                items: await basicFetch(`/discover/movie?with_genres=35&language=${FETCH_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'drama',
                title: 'Drama',
                items: await basicFetch(`/discover/movie?with_genres=18&language=${FETCH_LANGUAGE}&api_key=${API_KEY}`)
            },
            {
                slug: 'artistas',
                title: 'Informações de artistas',
                items: await basicFetch(`/person/popular?language=${FETCH_LANGUAGE}&api_key=${API_KEY}`)
            },
        ]
    },
    getMovieDetails: async (movieID, type) => {
        let details = {};

        if(type === 'movie'){
            details = await basicFetch(`/movie/${movieID}?language=${FETCH_LANGUAGE}&api_key=${API_KEY}`);
        }else if(type === 'tv'){
            details = await basicFetch(`/tv/${movieID}?language=${FETCH_LANGUAGE}&api_key=${API_KEY}`);
        }

        return details;
    },
    getArtistDetails: async(artistID) =>{
        let details = await basicFetch(`/person/${artistID}?language=${FETCH_LANGUAGE}&api_key=${API_KEY}`);

        return details;
    },
    getByName: async(str) =>{
        return[
            {
                slug: 'resultados',
                title: 'Resultados de pesquisa',
                items: await basicFetch(`/search/multi?query=${encodeURIComponent(str)}&api_key=${API_KEY}&language=${FETCH_LANGUAGE}`)
            }
        ]
    } 
}