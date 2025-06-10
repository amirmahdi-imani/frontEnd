import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { supabase } from '@/lib/supabaseClient'

// دریافت محصول
export const fetchProductById = createAsyncThunk(
    'productDetail/fetchProductById',
    async(id) => {
        const { data, error } = await supabase
            .from('next-store')
            .select('*')
            .eq('id', id)
            .single()

        if (error) throw error
        return data
    }
)

// چک کردن وجود در سبد خرید
export const checkIfInCart = createAsyncThunk(
    'productDetail/checkIfInCart',
    async(_, { getState }) => {
        const { product } = getState().productDetail
        const { data: { user } } = await supabase.auth.getUser()
        if (!user) return false

        const { data, error } = await supabase
            .from('cart')
            .select('id')
            .eq('user_id', user.id)
            .eq('product_id', product.id)
            .single()

        if (error) return false
        return !!data
    }
)

// افزودن به سبد خرید
export const addToCartIfLoggedIn = createAsyncThunk(
    'productDetail/addToCartIfLoggedIn',
    async(_, { getState, rejectWithValue }) => {
        const { product } = getState().productDetail
        const { data: { user } } = await supabase.auth.getUser()

        if (!user) return rejectWithValue('unauthenticated')

        const { error } = await supabase.from('cart').insert([{
            user_id: user.id,
            product_id: product.id,
            name: product.name,
            price: product.price,
            img: product.images,
            quantity: 1,
        }])

        if (error) throw error
        return { message: 'added' }
    }
)

const productDetailSlice = createSlice({
    name: 'productDetail',
    initialState: {
        product: null,
        status: 'idle',
        error: null,
        cartStatus: 'idle',
        cartError: null,
        alreadyInCart: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProductById.pending, (state) => {
                state.status = 'loading'
                state.error = null
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.product = action.payload
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })

        // اضافه شدن به سبد خرید
        .addCase(addToCartIfLoggedIn.pending, (state) => {
                state.cartStatus = 'loading'
                state.cartError = null
            })
            .addCase(addToCartIfLoggedIn.fulfilled, (state) => {
                state.cartStatus = 'succeeded'
                state.alreadyInCart = true
            })
            .addCase(addToCartIfLoggedIn.rejected, (state, action) => {
                state.cartStatus = 'failed'
                state.cartError = action.payload || action.error.message
            })

        // چک وجود محصول در سبد خرید
        .addCase(checkIfInCart.fulfilled, (state, action) => {
            state.alreadyInCart = action.payload
        })
    },
})

export default productDetailSlice.reducer