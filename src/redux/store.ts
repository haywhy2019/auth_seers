import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import storage from "redux-persist/lib/storage";

import app from "./features/app.slice";
import auth from "./features/auth.slice";

// Combine reducers
const rootReducer = combineReducers({
  app,
  auth,
});

// Persist configuration
const persistConfig = {
  key: "root", // Key for localStorage
  storage, // Storage engine
  whitelist: ["app", "auth"], // Reducers you want to persist
};

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Types for better TypeScript integration
export type RootState = ReturnType<typeof rootReducer>; // State structure
export type AppDispatch = typeof store.dispatch; // Dispatch type

// Persistor for persisting store
export const persistor = persistStore(store);
