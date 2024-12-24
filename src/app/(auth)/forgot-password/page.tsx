import React from "react"

import { Metadata } from "next"

import ForgotPasswordForm from "./ForgotPasswordForm"

export const metadata: Metadata = {
   title: "LafiaEMR - Forgot Password",
   description: "",
}

const ForgotPasswordPage = () => {
   return <ForgotPasswordForm />
}

export default ForgotPasswordPage
