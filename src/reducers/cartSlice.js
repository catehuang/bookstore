import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    userId: null,
    products: [],
    quantity: 0,
    total: 0,
  },
  reducers: {
    newCart: (state, action) => {
      state.userId = action.payload.userId;
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    setCart: (state, action) => {
      state.userId = action.payload.userId;
      state.products = action.payload.products;
      state.quantity = action.payload.products.reduece(
        (cartItemQuantity) => cartItemQuantity + 1,
        0
      );
      state.total = action.payload.products.reduce(
        (accumulatedTotal, product) =>
          accumulatedTotal + product.quantity * product.price,
        0
      );
    },
    addProduct: (state, action) => {
      // does this item in cart
      const existingCartItem = state.products.find(
        (product) => product._id === action.payload._id
      );
      // the adding item is in carr, find the state of existing item in cart
      if (existingCartItem) {
        // looping thorugh all items in cart to find the adding item, then update the quantity
        state.products = state.products.map((product) =>
          product._id === action.payload._id
            ? { ...product, quantity: state.quantity+Number(action.payload.quantity) }
            : product
        );
        // adjust the total price
        state.total = state.products.reduce(
          (total, product) => total + product.quantity * product.price,
          0
        );
      } else {
        // the adding item isn't in cart, push the adding item into cart
        state.quantity += Number(action.payload.quantity);
        state.products.push(action.payload);
        state.total += action.payload.price * Number(action.payload.quantity);
      }
    },
    updateProduct: (state, action) => {
      const existingCartItem = state.products.find(
        (product) => product._id === action.payload._id
      );
      // check the updating item is in cart
      if (existingCartItem) {
        console.log(action.payload.quantity);
        console.log(state.quantity);
        // looping therough all items in cart to find out the updating item, then update the quantity
        state.products = state.products.map((product) =>
          product._id !== action.payload._id
            ? { ...product, quantity: Number(action.payload.quantity) }
            : product
        );
        state.total = state.products.reduce(
          (total, product) => total + product.quantity * product.price,
          0
        );
      }
    },
    deleteProduct: (state, action) => {
      // const existingCartItem = state.products.find(
      //   (product) => product._id === action.payload._id
      // );
      state.products = state.products.filter(product => product._id !== action.payload._id);
      state.quantity -= 1;
      state.total = state.products.reduce(
        (total, product) => total + product.quantity * product.price,
        0
      );
    },
    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    logoutCart: (state) => {
      state.userId = null;
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  newCart,
  setCart,
  addProduct,
  updateProduct,
  deleteProduct,
  clearCart,
  logoutCart,
} = cartSlice.actions;

export default cartSlice.reducer;
