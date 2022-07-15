import { configureStore , combineReducers } from 'redux';

const initialState = {};
const reducer = combineReducers({
        productList: productListReducer,
});

const store =configureStore (reducer, initialState);