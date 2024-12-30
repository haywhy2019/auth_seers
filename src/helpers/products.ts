import { Products } from "@/types/general.types"

export const getProductsByIds = (allProducts: Products[], index: number[]) => {
   console.log(allProducts, index, "all pro var")
   return allProducts.filter((product) => index.includes(product.id))
}

export const getProductsId = (allProducts: Products[]) => {
   return allProducts.map((item) => item.id)
}
