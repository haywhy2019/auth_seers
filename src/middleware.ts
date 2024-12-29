/* eslint-disable */
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { authRoutes } from "@/helpers/routes"

import { User } from "@/types/general.types"

import { userStatus } from "./helpers/enum"
import { getRedirectUrl } from "./helpers/utils"

const getJsonParsedCookie = (req: NextRequest, key: string) => {
   try {
      return JSON.parse(req.cookies.get(key)?.value as string)
      //eslint-disable-next-line
   } catch (error) {
      return undefined
   }
}

export async function middleware(request: NextRequest) {
   const url = request.nextUrl
   const pathname = url.pathname

   const authPages = [
      authRoutes.forgotPassword,
      authRoutes.resetPassword,
      authRoutes.signup,
      authRoutes.createPassword,
      authRoutes.verify,
   ]

   const isAuthPage = authPages.some((page) => pathname.startsWith(page))

   const token = getJsonParsedCookie(request, "token") as string
   const user = getJsonParsedCookie(request, "user") as User

   // Redirect to login page if user is not logged in & tries to access verify page
   if (!user && pathname === authRoutes.verify) {
      const loginUrl = new URL(authRoutes.login, request.url)
      return NextResponse.redirect(loginUrl)
   }

   //Redirect user if logged in & not trying to authenticate a sub-application
   if (pathname === authRoutes.login && user) {
      const hasPrompt = url.searchParams.has("prompt")
      const hasLoginHint = url.searchParams.has("login_hint")
      const hasContinue = url.searchParams.has("continue")

      if (!hasPrompt && !hasLoginHint && !hasContinue) {
         const redirectUrl = new URL(getRedirectUrl(user)!, request.url)
         return NextResponse.redirect(redirectUrl)
      }
   }

   // Redirect to email verifiy page if email is not verified
   if (user && user?.status !== userStatus.ACTIVE && pathname !== authRoutes.verify) {
      const loginUrl = new URL(authRoutes.verify, request.url)
      return NextResponse.redirect(loginUrl)
   }

   // Redirect to dashboard if user is already logged in
   if (token && isAuthPage) {
      const url = new URL(getRedirectUrl(user)!, request.url)
      return NextResponse.redirect(url)
   }

   // Allow the request to proceed for other cases
   return NextResponse.next()
}

export const config = {
   matcher: [
      "/login",
      "/signup",
      "/verify",
      "/forgot-password",
      "/reset-password",
      "/create-password",
   ],
}
