import React from "react"

import { Metadata } from "next"

import ResetPasswordForm from "../reset-password/ResetPasswordForm"

export const metadata: Metadata = {
   title: "LafiaEMR - Create Password",
   description: "",
}

const ForgotPasswordPage = () => {
   return <ResetPasswordForm createPassword />
}

export default ForgotPasswordPage
