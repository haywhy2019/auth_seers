/** @format */

/* eslint-disable */
import { AxiosResponse } from "axios"

import { User } from "./general.types"

export type authApiType = {
   login: (payload: LoginType) => Promise<AxiosResponse>
   signup: (payload: SignupType) => Promise<AxiosResponse>
   verifyOtp: (payload: VerifyType) => Promise<AxiosResponse>
   resendOtp: (payload: { email: string }) => Promise<AxiosResponse>
   forgotPassword: (payload: { email: string }) => Promise<AxiosResponse>
   resetPassword: (payload: ResetPasswordType) => Promise<AxiosResponse>
}

export type LoginType = {
   userName: string
   password: string
}

export type VerifyType = {
   userName: string
   otp: string
}

export type ResetPasswordType = {
   code: string
   newPassword: string
   confirmPassword: string
}

export type SignupType = {
   organizationType: User["organizationType"]
   organizationName: string
   email: string
   confirmPassword: string
   password: string
}
