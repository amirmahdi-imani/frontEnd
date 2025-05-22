import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const PRODUCTS_API = 'https://fakestoreapi.com/products';


export const fetchProducts = createAsyncThunk(
    'fakeStore/fetchProducts',
    async(_, thunkAPI) => {
        try {
            const response = await axios.get(PRODUCTS_API);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);


const fakeStoreSlice = createSlice({
    name: 'fakeStore',
    initialState: {
        products: [],
        status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
        error: null,
    },
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.products = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    },
});

export default fakeStoreSlice.reducer;