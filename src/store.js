import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartSlice';

export const store =  configureStore({ 
        // actions
        reducer: {
                cart: cartReducer,
        }
});
