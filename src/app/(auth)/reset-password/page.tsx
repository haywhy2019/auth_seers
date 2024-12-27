import React from "react"

import { Metadata } from "next"

import ResetPasswordForm from "./ResetPasswordForm"

export const metadata: Metadata = {
   title: "LafiaEMR - Reset Password",
   description: "",
}

const ForgotPasswordPage = () => {
   return <ResetPasswordForm />
}

export default ForgotPasswordPage
