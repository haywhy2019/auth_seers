/** @format */
import { authApiType } from "@/types/auth.types"

import { privateInstance, publicInstance } from "./instance"

const authApi: authApiType = {
   login: async (payload) => await publicInstance.post("/auth/login", payload),
   lafiaHMSLogin: async (payload) => await publicInstance.post("/auth/service/openmrs", payload),
   signup: async (payload) => await publicInstance.post("/auth/signup", payload),
   verifyOtp: async (payload) => await publicInstance.post("/auth/verify-otp", payload),
   resendOtp: async (payload) => await publicInstance.post("/auth/resend-otp", payload),
   forgotPassword: async (payload) =>
      await publicInstance.patch("/auth/begin_reset_password", payload),
   resetPassword: async (payload) =>
      await publicInstance.patch(`/auth/reset_password?code=${payload.code}`, payload),
}

export default authApi
