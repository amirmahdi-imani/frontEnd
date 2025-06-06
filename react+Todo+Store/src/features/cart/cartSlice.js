import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    item: []
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existing = state.item.find((i) => i.id === item.id);


            if (existing) {
                existing.quantity += 1;
            } else {
                state.item.push({...item, quantity: 1 });
            }
        },
        removeFromCart: (state, action) => {
            state.item = state.item.filter((item) => item.id !== action.payload);
        },
        clearCart: (state) => {
            state.item = [];
        }
    }

})
export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;