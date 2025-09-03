import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";

import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

// --- Persist config ---
const persistConfig = {
  key: "root", // key in localStorage
  storage, // storage engine (localStorage here)
  whitelist: ["auth"], // state slices you want to persist
};

// Wrap reducer with persistReducer
const persistedAuthReducer = persistReducer(persistConfig, authReducer);

// --- Store ---
export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
});

export const persistor = persistStore(store);
