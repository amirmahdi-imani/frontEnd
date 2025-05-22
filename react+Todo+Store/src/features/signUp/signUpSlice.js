// src/features/auth/signUpSlice.js
import { createSlice } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';


const initialState = {
    user: null,
    loading: false,
    error: null,
};

const signUpSlice = createSlice({
    name: 'signUp',
    initialState,
    reducers: {
        signUpStart: (state) => {
            state.loading = true;
        },
        signUpSuccess: (state, action) => {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
            toast.success('success signUp....:)')
        },
        signUpFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
            toast.error('error loging....:)')
        },
    },
});

export const { signUpStart, signUpSuccess, signUpFailure } = signUpSlice.actions;

export default signUpSlice.reducer;