import { Products } from "@/types/general.types"

const getProductsByIds = (allProducts: Products[], index: number[]) => {
   console.log(allProducts, index, "all pro var")
   return allProducts.filter((product) => index.includes(product.id))
}

export default getProductsByIds
