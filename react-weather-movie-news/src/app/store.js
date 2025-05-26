import { configureStore } from "@reduxjs/toolkit";
import newsReducer from '../features/news/newsSlice';
import weatherReducer from "../features/weather/weatherSlice";
import moviesReducer from '../features/movies/moviesSlice'
import movieGenreReducer from '../features/movies/movieByGenreSlice'
import moviesSearchReducer from '../features/movies/searchMovieSlice'
import genresReducer from '../features/movies/genresSlice'



export const store = configureStore({
    reducer: {
        news: newsReducer,
        weather: weatherReducer,
        movies: moviesReducer,
        movieGenre: movieGenreReducer,
        moviesSearch: moviesSearchReducer,
        genres: genresReducer

    }
})