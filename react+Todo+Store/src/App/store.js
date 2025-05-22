import { configureStore } from "@reduxjs/toolkit";
import todosReducer from '../features/todos/todosSlice.js'
import signUpReducer from '../features/signUp/signUpSlice.js'
import authReducer from '../features/auth/authSlice.js'
import fakeStoreReducer from "../features/fakeStore/fakeStoreSlice.js";
import cartReducer from '../features/cart/cartSlice.js'

export const store = configureStore({
    reducer: {
        todos: todosReducer,
        signUp: signUpReducer,
        auth: authReducer,
        fakeStore: fakeStoreReducer,
        cart: cartReducer
    }
})