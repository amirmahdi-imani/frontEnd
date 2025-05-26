import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchMoviesByGenre } from './moviesAPI';

export const getMoviesByGenre = createAsyncThunk(
    'movies/byGenre',
    async({ genreId, page }) => {
        return await fetchMoviesByGenre(genreId, page);
    }
);

const moviesByGenreSlice = createSlice({
    name: 'moviesByGenre',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMoviesByGenre.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getMoviesByGenre.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getMoviesByGenre.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default moviesByGenreSlice.reducer;