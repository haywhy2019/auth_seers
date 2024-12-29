import React from "react"

import { Metadata } from "next"

import { redirect } from "next/navigation"

import authApi from "@/axios/auth.api"

import { authRoutes } from "@/helpers/routes"

import LoginForm from "./LoginForm"

type LoginSearchParams = {
   login_hint?: string
   prompt?: string
   continue?: string
}

const API_ENDPOINTS = {
   LafiaHMS: authApi.lafiaHMSLogin,
   // Add other API endpoints as needed
}

export const metadata: Metadata = {
   title: "LafiaEMR - Login",
   description: "",
}

const Login = async ({ searchParams }: { searchParams: LoginSearchParams }) => {
   const { login_hint, prompt, continue: continueUrl } = searchParams

   // If there's a prompt and login_hint, handle the login
   if (prompt && login_hint) {
      try {
         // Get the correct API endpoint function
         const loginEndpoint = API_ENDPOINTS[prompt as keyof typeof API_ENDPOINTS]

         if (!loginEndpoint) {
            throw new Error(`Invalid prompt: ${prompt}`)
         }

         // Make the API call
         const response = await loginEndpoint({ login_hint })
         // If successful, redirect to continue URL
         if (response.data) {
            redirect(continueUrl!)
         }
      } catch {
         // redirect(continueUrl!)
         redirect(authRoutes.login)
      }
   }

   // Only reach LoginForm if there's no prompt
   return <LoginForm />
}

export default Login
