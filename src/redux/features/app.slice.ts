/** @format */
import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "../initialState"
import { RootState } from "../store"

export const appSlice = createSlice({
   name: "app",
   initialState: initialState.app,
   reducers: {},
})

export const appSelector = (state: RootState) => state.app

export const {} = appSlice.actions

export default appSlice.reducer
