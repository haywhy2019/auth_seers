/** @format */
import { authApiType } from "@/types/auth.types"

import { publicInstance } from "./instance"

const authApi: authApiType = {
   login: async (payload) => await publicInstance.post("/auth/login", payload),
   signup: async (payload) => await publicInstance.post("/auth/signup", payload),
}

export default authApi
