import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchpopularMovies } from "./moviesAPI";



export const getMovies = createAsyncThunk('movies/getMovies',
    async() => {
        const result = await fetchpopularMovies();
        return await result;
    }
)


const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        data: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMovies.pending, (state) => {
                state.status = 'succeeded';
            })
            .addCase(getMovies.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            })
            .addCase(getMovies.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
})

export default moviesSlice.reducer;