import {privateInstance} from "./instance"

const productsApi = {
   products: async () => await privateInstance.get("/product/all"),
}

export default productsApi