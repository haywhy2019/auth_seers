/* eslint-disable */
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { authRoutes } from "@/helpers/routes"

import { User } from "@/types/general.types"

import { userStatus } from "./helpers/enum"

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

   // const token = getJsonParsedCookie(request, "token") as string
   const user = getJsonParsedCookie(request, "user") as User

   // Redirect to email verifiy page if email is not verified
   if (user && user?.status !== userStatus.ACTIVE && pathname !== authRoutes.verify) {
      const loginUrl = new URL(authRoutes.verify, request.url)
      return NextResponse.redirect(loginUrl)
   }

   // Allow the request to proceed for other cases
   return NextResponse.next()
}

export const config = {
   matcher: ["/login", "/signup", "/verify"],
}
