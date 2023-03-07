import { configureStore } from "@reduxjs/toolkit";
import {persistStore} from "redux-persist";

import persistedReducer from "./root-reducer.js";

export const store = configureStore({
    reducer: persistedReducer
});

export const persistor = persistStore(store);
