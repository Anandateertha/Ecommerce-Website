import { configureStore } from "@reduxjs/toolkit";
import cartItemCounterSlice from './slices/cartitems'

export const store = configureStore({
    reducer: {
        cartitems: cartItemCounterSlice
    }
})