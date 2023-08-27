import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const host = 'http://localhost:5000'

export const cartItemfetch = createAsyncThunk("cartItemfetch", async () => {
    const response = await fetch(`${host}/api/orderproduct/itemsincart`, {
        method: "GET",
        headers: {
            "auth-token": localStorage.getItem('token')
        }
    });
    const json = await response.json();
    return json.length;
});

export const cartItemCounterSlice = createSlice({
    name: 'cartitems',
    initialState: {
        cartnumber: null
    },
    extraReducers: (builder) => {
        builder.addCase(cartItemfetch.fulfilled, (state, action) => {
            state.cartnumber = action.payload
        });
    },
    reducers: {
        increment: (state) => {
            state.cartnumber += 1
        },
        decrement: (state) => {
            state.cartnumber -= 1
        }
    }
})

export const { increment, decrement } = cartItemCounterSlice.actions;
export default cartItemCounterSlice.reducer;
