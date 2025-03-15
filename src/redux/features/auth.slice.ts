/** @format */
import { createSlice } from "@reduxjs/toolkit"
import Cookies from "js-cookie"

import { cookieOptions } from "@/helpers/enum"
import { authRoutes } from "@/helpers/routes"

import { initialState } from "../initialState"
import { RootState } from "../store"

const cookieConfig = {
   httpOnly: false,
   domain: process.env.NEXT_PUBLIC_TL_DOMAIN,
   secure: false,
   sameSite: "strict",
   path: "/",
   expires: 0.4167, //10 hours
} as const

export const authSlice = createSlice({
   name: "auth",
   initialState: initialState.auth,
   reducers: {
      setUser: (state, { payload }) => {
         state.user = payload.user
      },
      setAuth: (state, { payload }) => {
         state.user = payload.user
         if (payload.token)
            Cookies.set(
               cookieOptions.ACCESS_TOKEN_COOKIE,
               JSON.stringify(payload.token),
               cookieConfig,
            )
         Cookies.set(
            cookieOptions.REFRESH_TOKEN_COOKIE,
            JSON.stringify(payload.refreshToken),
            cookieConfig,
         )
         Cookies.set(cookieOptions.USER_DETAILS_COOKIE, JSON.stringify(payload.user), cookieConfig)
         Cookies.set(cookieOptions.TENANT_ID_COOKIE, payload.user.tenantId, cookieConfig)
      },
      saveEncodedCredentials: (_, { payload }) => {
         Cookies.set(cookieOptions.LAFIAHMS_CREDENTIALS_COOKIE, payload, cookieConfig)
      },
      logout: (state) => {
         state.user = null as any
         Cookies.remove(cookieOptions.ACCESS_TOKEN_COOKIE, cookieConfig)
         Cookies.remove(cookieOptions.USER_DETAILS_COOKIE, cookieConfig)
         Cookies.remove(cookieOptions.TENANT_ID_COOKIE, cookieConfig)
         Cookies.remove(cookieOptions.LAFIAHMS_CREDENTIALS_COOKIE, cookieConfig)
         window.location.href = authRoutes.login
      },
   },
})

export const authSelector = (state: RootState) => state.auth

export const { setUser, setAuth, saveEncodedCredentials, logout } = authSlice.actions

export default authSlice.reducer
