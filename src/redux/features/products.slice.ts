import { createSlice } from "@reduxjs/toolkit"

import { initialState } from "../initialState"
import { RootState } from "../store"

export const productsSlice = createSlice({
   name: "products",
   initialState: initialState.products,
   reducers: {
      products: (state, { payload }) => {
         state.allProducts = payload
      },
      selectedProduct: (state, { payload }) => {
         state.selectedProduct = payload
      },
   },
})

export const { products, selectedProduct } = productsSlice.actions

export const selectProductAndProducts = (state: RootState) => state.productInfo

export default productsSlice.reducer
