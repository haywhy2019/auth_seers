import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "../initialState"
import { RootState } from "../store"

export const onBoardSlice = createSlice({
   name: "counter",
   initialState: initialState.onBoard,
   reducers: {
      increment: (state) => {
         state.counter += 1
      },
      decrement: (state) => {
         state.counter -= 1
      },
      reset: (state) => {
         state.counter = 0
      },
      formData: (state, { payload }) => {
         console.log(payload, "payload drom onboard slice")
         state.formData = payload
      },
   },
})

export const { increment, decrement, reset, formData } = onBoardSlice.actions

export const selectOnBoardStepper = (state: RootState) => state.onBoard

export default onBoardSlice.reducer
