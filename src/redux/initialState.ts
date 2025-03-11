import { User } from "@/types/general.types"
import { Products } from "@/types/product.types"

export const initialState = {
   app: {},
   auth: {
      user: {} as User,
   },
   onBoard: {
      counter: 0,
      
   },
  
}
