import { Products } from "@/types/product.types"

// export const getProductsByIds = (allProducts: Products[], selected: Products[]) => {
//    return allProducts.filter((product) => index.includes(product.id))
// }

export const getProductsId = (allProducts: Products[]) => {
   return allProducts.map((item) => item.id)
}
