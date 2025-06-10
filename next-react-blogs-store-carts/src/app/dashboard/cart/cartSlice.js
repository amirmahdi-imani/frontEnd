import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { supabase } from "@/lib/supabaseClient";

// گرفتن کارت کاربر
export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async({ user_id }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from('cart')
                .select('*')
                .eq('user_id', user_id);

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// آپدیت تعداد محصول
export const updateQuantity = createAsyncThunk(
    'cart/updateQuantity',
    async({ id, quantity }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase
                .from('cart')
                .update({ quantity })
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// حذف محصول از کارت
export const removeFromCartDB = createAsyncThunk(
    'cart/removeFromCartDB',
    async(id, { rejectWithValue }) => {
        try {
            const { error } = await supabase
                .from('cart')
                .delete()
                .eq('id', id);

            if (error) throw error;
            return id; // برگردوندن id برای حذف از state
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        // می‌تونی اگه نیاز بود اینجا اکشن محلی اضافه کنی
    },
    extraReducers: (builder) => {
        builder
        // fetchCart
            .addCase(fetchCart.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })

        // updateQuantity
        .addCase(updateQuantity.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateQuantity.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.items.findIndex(i => i.id === action.payload.id);
                if (index !== -1) {
                    state.items[index].quantity = action.payload.quantity;
                }
            })
            .addCase(updateQuantity.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            })

        // removeFromCartDB
        .addCase(removeFromCartDB.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(removeFromCartDB.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = state.items.filter(i => i.id !== action.payload);
            })
            .addCase(removeFromCartDB.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    }
});

export default cartSlice.reducer;
export { fetchCart, updateQuantity, removeFromCartDB };