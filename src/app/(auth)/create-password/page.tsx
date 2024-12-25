import React from "react"

import { Metadata } from "next"

import CreatePasswordForm from "./CreatePasswordForm"

export const metadata: Metadata = {
   title: "LafiaEMR - Create Password",
   description: "",
}

const ForgotPasswordPage = () => {
   return <CreatePasswordForm />
}

export default ForgotPasswordPage
