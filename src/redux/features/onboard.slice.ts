import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "../initialState"
import { RootState } from "../store"

export interface CounterState {
   value: number
}

export const onBoardSlice = createSlice({
   name: "counter",
   initialState,
   reducers: {
      increment: (state) => {
         state.onBoard.counter += 1
      },
      reset: (state) => {
         state.onBoard.counter = 0
      },
   },
})

export const { increment, reset } = onBoardSlice.actions

export const selectOnBoardStepper = (state: RootState) => state.onBoard

export default onBoardSlice.reducer
