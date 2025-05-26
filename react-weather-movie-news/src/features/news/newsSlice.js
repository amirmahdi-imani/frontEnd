import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./newAPI";



export const getNews = createAsyncThunk('news/getNews', async(country) => {
    const data = await fetchNews(country);
    return data
})

const newsSlice = createSlice({
    name: 'news',
    initialState: {
        articles: [],
        status: 'idle',
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNews.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getNews.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.articles = action.payload;
            })
            .addCase(getNews.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });

    }
})

export default newsSlice.reducer;