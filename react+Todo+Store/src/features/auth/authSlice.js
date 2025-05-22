// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../../authApi';
import toast from 'react-hot-toast';

export const loginUser = createAsyncThunk(
    'auth/loginUser',
    async({ email, password }, { rejectWithValue }) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        toast.success('success loging....:)');
        if (error) {
            toast.error('Loging is not success!!!')
            return rejectWithValue(error.message);
        }



        return data.user;
    }
);
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async(_, { rejectWithValue }) => {
        const { error } = await supabase.auth.signOut();
        if (error) return rejectWithValue(error.message);
        toast.success('success Logout....:)')
        return true;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isLoading: false,
        error: null,
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.user = action.payload;
            state.isLoading = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
        // Login
            .addCase(loginUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isLoading = false;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

        // Logout
        .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isLoading = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    },
});
export const { loginSuccess } = authSlice.actions;
export default authSlice.reducer;