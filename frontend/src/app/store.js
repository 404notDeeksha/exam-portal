import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({
  auth: authReducer,
  // add other reducers here
});

// --- Persist config ---
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

// Wrap reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// --- Store ---
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
