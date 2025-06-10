import * as z from "zod";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '@/lib/supabaseClient';




export const loginSchema = z.object({
    email: z.string().email("Email is not valid."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
});


export const loginUser = createAsyncThunk(
    'login/loginUser',
    async({ email, password }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            return data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const loginSlice = createSlice({
    name: 'login',
    initialState: {
        user: null,
        loading: false,
        error: null,
        toastMessage: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.toastMessage = 'Varifying credentials...'
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.toastMessage = 'Welcome back :)';
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.toastMessage = 'Login failed ' + action.payload;
            });
    },
});

export const { setUser } = loginSlice.actions

export default loginSlice.reducer;