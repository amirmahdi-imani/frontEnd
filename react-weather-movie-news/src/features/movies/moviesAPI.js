import axios from "axios";



const API_KEY = '7658598b4d1e9c6c0634b6c8aea2bbb0';
const BASE_URL = 'https://api.themoviedb.org/3/movie/popular';


export const fetchpopularMovies = async() => {
    const response = await axios.get(BASE_URL, {
        params: {
            api_key: API_KEY,
            language: 'en-US',
            page: 1
        }
    })
    return response.data.results;
}


const BASE_URL1 = 'https://api.themoviedb.org/3';

export const fetchMoviesByGenre = async(genreId, page = 1) => {
    const response = await axios.get(`${BASE_URL1}/discover/movie`, {
        params: {
            api_key: API_KEY,
            with_genres: genreId,
            page,
            language: 'en-US',
        },
    });

    return response.data.results;
};

export const searchMovies = async(query, page = 1) => {
    const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
            api_key: API_KEY,
            query,
            page,
            language: 'en-US',
        },
    });

    return response.data;
};




export const fetchGenres = async() => {
    const response = await axios.get('https://api.themoviedb.org/3/genre/movie/list', {
        params: {
            api_key: API_KEY,
            language: 'en-US',
        },
    });

    return response.data.genres;
};