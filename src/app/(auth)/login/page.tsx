import React from "react"

import { Metadata } from "next"

import LoginForm from "./LoginForm"

export const metadata: Metadata = {
   title: "LafiaEMR - Login",
   description: "",
}

const Login = () => {
   return <LoginForm />
}

export default Login
