import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchMovies } from './moviesAPI';

export const searchMoviesThunk = createAsyncThunk(
    'movies/search',
    async({ query, page }) => {
        return await searchMovies(query, page);
    }
);

const searchMoviesSlice = createSlice({
    name: 'searchMovies',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(searchMoviesThunk.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(searchMoviesThunk.fulfilled, (state, action) => {
                state.data = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.status = 'succeeded';
            })
            .addCase(searchMoviesThunk.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default searchMoviesSlice.reducer;