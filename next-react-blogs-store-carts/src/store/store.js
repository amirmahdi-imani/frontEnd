import { configureStore } from "@reduxjs/toolkit";
import ProductsReducer from '../app/products/productsSlice'
import ProductDetailReducer from '../app/products/[id]/productDetailSlice'
import signupReducer from '../app/auth/signup/signupSlice'
import loginReducer from '../app/auth/login/loginSlice'
import cartReducer from '../app/dashboard/cart/cartSlice'
import blogReducer from '../app/dashboard/blogManagement/blogSlice'
export const store = configureStore({
    reducer: {
        products: ProductsReducer,
        productDetail: ProductDetailReducer,
        signup: signupReducer,
        login: loginReducer,
        cart: cartReducer,
        blog: blogReducer
    }
})