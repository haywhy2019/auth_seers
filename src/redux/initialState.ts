import { User } from "@/types/general.types"

export const initialState = {
   app: {},
   auth: {
      user: {} as User,
   },
   onBoard: {
      counter: 0,
   },
}
