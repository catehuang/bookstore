import { configureStore, combineReducers  } from "@reduxjs/toolkit";
import cartReducer from "./reducers/cartSlice";
import userReducer from "./reducers/userSlice";
import orderReducer from "./reducers/orderSlice";
import storage from "redux-persist/lib/storage";
import {
        persistStore,
        persistReducer,
        FLUSH,
        REHYDRATE,
        PAUSE,
        PERSIST,
        PURGE,
        REGISTER,
} from "redux-persist";

const persistConfig = {
        key: "root",
        version: 1,
        storage,
};

const rootReducer = combineReducers({
        user: userReducer,
        cart: cartReducer,
        order: orderReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
        reducer: persistedReducer,
        middleware: (getDefaultMiddleware) =>
                getDefaultMiddleware({
                        serializableCheck: {
                                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                        },
                }),
});

export let persistor = persistStore(store);
