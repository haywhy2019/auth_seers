/** @format */
import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "../initialState"
import { RootState } from "../store"

export const authSlice = createSlice({
   name: "auth",
   initialState: initialState.auth,
   reducers: {
      setUser: (state, { payload }) => {
         state.user = payload
      },
   },
})

export const authSelector = (state: RootState) => state.auth

export const { setUser } = authSlice.actions

export default authSlice.reducer
