import { createSlice } from '@reduxjs/toolkit'

export const cartItemCounterSlice = createSlice({
    initialState: { value: localStorage.getItem('numberofitemsincart')!==null?parseInt(localStorage.getItem('numberofitemsincart')):0 },
    name: 'cartitems',
    reducers: {
        increment: (state) => { state.value += 1 },
        decrement: (state) => { state.value -= 1 }
    }
})


export const {increment,decrement}=cartItemCounterSlice.actions
export default cartItemCounterSlice.reducer