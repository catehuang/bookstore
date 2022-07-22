import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartSlice';
import usersReducer from './reducers/usersSlice';

export const store =  configureStore({ 
        // actions
        reducer: {
                cart: cartReducer,
                users: usersReducer
        }
});
