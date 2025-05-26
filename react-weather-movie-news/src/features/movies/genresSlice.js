import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGenres } from './moviesAPI';

const initialState = {
    data: [],
    status: 'idle', // 'loading' | 'succeeded' | 'failed'
    error: null,
};

// ژانرها
export const getGenres = createAsyncThunk('genres/fetchGenres', async() => {
    const genres = await fetchGenres();
    return genres;
});

const genresSlice = createSlice({
    name: 'genres',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getGenres.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getGenres.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getGenres.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default genresSlice.reducer;