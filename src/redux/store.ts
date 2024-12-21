import { combineReducers, configureStore } from "@reduxjs/toolkit"
import Cookies from "js-cookie"
import { persistReducer, persistStore } from "redux-persist"
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist"

import app from "./features/app.slice"
import auth from "./features/auth.slice"
import onBoard from "./features/onboard.slice"

// Combine reducers
const rootReducer = combineReducers({
   app,
   auth,
   onBoard,
})

// Custom storage engine using cookies
const cookieStorage = {
   getItem: (key: string) => {
      const value = Cookies.get(key)
      return value ? Promise.resolve(value) : Promise.resolve(null)
   },
   setItem: (key: string, value: string) => {
      Cookies.set(key, value, {
         httpOnly: process.env.NODE_ENV === "production",
         domain: process.env.NEXT_PUBLIC_TL_DOMAIN,
         secure: true,
         sameSite: "strict",
         path: "/",
      })
      return Promise.resolve()
   },
   removeItem: (key: string) => {
      Cookies.remove(key, {
         domain: ".yourdomain.com",
      })
      return Promise.resolve()
   },
}

// Persist configuration
const persistConfig = {
   key: "root", // Key for localStorage
   storage: cookieStorage, // Storage engine
   whitelist: ["app", "auth", "onBoard"], // Reducers you want to persist
}

// Persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Configure the store
export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
         serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
         },
      }),
})

// Types for better TypeScript integration
export type RootState = ReturnType<typeof rootReducer> // State structure
export type AppDispatch = typeof store.dispatch // Dispatch type

// Persistor for persisting store
export const persistor = persistStore(store)
