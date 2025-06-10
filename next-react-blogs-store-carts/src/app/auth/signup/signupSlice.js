// redux/signup/signupSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { supabase } from '@/lib/supabaseClient'
import * as z from "zod";

export const signupUser = createAsyncThunk(
    'signup/signupUser',
    async({ email, password, name }, { rejectWithValue }) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: { name }
                }
            })

            if (error) throw error
            return data
        } catch (err) {
            return rejectWithValue(err.message)
        }
    }
)


const signupSlice = createSlice({
    name: 'signup',
    initialState: {
        user: null,
        loading: false,
        error: null,
        toastMessage: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(signupUser.pending, (state, action) => {
                state.loading = true
                state.error = null
                state.toastMessage = "Varifying credentials";
            })
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.user
                state.toastMessage = "Registration was successful.";
            })
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.toastMessage = "Registration error :" + action.payload;
            })
    }
})

export default signupSlice.reducer




export const signUpSchema = z.object({
    name: z.string().min(4, "The name must be at least 4 characters long."),
    email: z.string().email("Email is not valid."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "The password and its repetition do not match.",
    path: ["confirmPassword"],
});