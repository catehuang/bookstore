import { configureStore } from '@reduxjs/toolkit';
import { productList } from './reducers/productList';


const store =  configureStore({ reducer: productList });

export default store;