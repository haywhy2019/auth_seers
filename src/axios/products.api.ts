import { ProductPricing } from "@/types/product.types"

import { privateInstance } from "./instance"

const productsApi = {
   products: async () => await privateInstance.get("/product/all"),
   selectProducts: async (payload: ProductPricing[]) =>
      await privateInstance.post("/tenant/product/subscribe", payload),
}

export default productsApi
