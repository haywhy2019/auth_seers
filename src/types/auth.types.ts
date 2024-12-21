/** @format */

/* eslint-disable */
import { AxiosResponse } from "axios"

import { User } from "./general.types"

export type authApiType = {
   login: (payload: LoginType) => Promise<AxiosResponse>
   signup: (payload: SignupType) => Promise<AxiosResponse>
}

export type LoginType = {
   userName: string
   password: string
}

export type SignupType = {
   organizationType: User["organizationType"]
   organizationName: string
   email: string
   confirmPassword: string
   password: string
}
