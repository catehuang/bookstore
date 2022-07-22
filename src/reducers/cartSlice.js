import { createSlice } from "@reduxjs/toolkit";

const initialState = {
        cart: [],
        //user: null
}

const cartSlice = createSlice({
        name: 'cart',
        initialState,
        reducers: {
                addToCart: {
                        reducer(state, action)
                        {
                                state.push(action.payload)
                        }
                }
        }
})

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer