import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";




export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async({ page = 1, limit = 12, searchName = '' }) => {
        const from = (page - 1) * limit
        const to = from + limit - 1

        let query = supabase.from('next-store').select('*')

        if (searchName) {
            query = query.ilike('name', `%${searchName}%`)
        }

        const { data, error } = await query.range(from, to)

        if (error) throw error
        return data
    }
)


const productsSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
        searchName: ''
    },
    reducers: {
        setSearchName: (state, action) => {
            state.searchName = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'successd'
                state.items = action.payload
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    }
})
export const { setSearchName } = productsSlice.actions
export default productsSlice.reducer