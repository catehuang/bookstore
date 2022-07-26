import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
        name: 'cart',
        initialState: {
                userId: null,
                products: [],
                quantity: 0,
                total: 0
        },
        reducers: {
                newCart: (state, action) => {
                        state.userId = action.payload.userId;
                        state.products = [];
                        state.quantity = 0;
                        state.total = 0
                },
                setCart: (state, action) => {
                        state.userId = action.payload.userId;
                        state.products = action.payload.products;
                        state.quantity = action.payload.products.reduece(cartItemQuantity => cartItemQuantity + 1, 0);
                        state.total = action.payload.products.reduce((accumulatedTotal, product) => accumulatedTotal + product.quantity * product.price, 0);
                },
                addProduct: (state, action) => {
                        const existingCartItem = state.products.find(product => product._id === action.payload._id);
                        if (existingCartItem) {
                          state.products = state.products.map(product => product._id === action.payload._id ? { ...product, quantity: product.quantity + Number(action.payload.quantity)} : product);
                          state.total = state.products.reduce((total, product) => total + product.quantity * product.price, 0);
                        }
                        else {
                          state.quantity += Number(action.payload.quantity); 
                          state.products.push(action.payload);
                          state.total += action.payload.price * Number(action.payload.quantity); 
                        }
                      },
                      decreaseProduct: (state, action) => {
                        const existingCartItem = state.products.find((product) => product._id === action.payload._id);

                        if (existingCartItem.quantity === 1) {
                          state.products = state.products.filter(product => product._id !== action.payload._id);
                          state.quantity -= 1;
                  
                        } else {
                          state.products = state.products.map(product => product._id === action.payload._id ? { ...product, quantity: product.quantity - 1 } : product);
                        }
                        state.total -= action.payload.price;
                      },
                      clearCart: (state) =>{
                        state.products = [];
                        state.quantity = 0;
                        state.total = 0
                      },
                      logoutCart:(state) =>{
                        state.userId = null;
                        state.products = [];
                        state.quantity = 0;
                        state.total = 0
                      }
        }
})

export const { newCart, setCart, addProduct, decreaseProduct, clearCart,logoutCart } = cartSlice.actions;

export default cartSlice.reducer