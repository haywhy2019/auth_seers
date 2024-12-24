import React from "react"

import { Metadata } from "next"

import VerifyForm from "./VerifyForm"

export const metadata: Metadata = {
   title: "LafiaEMR - Verify Email",
   description: "",
}

const VerifyPage = () => {
   return <VerifyForm />
}

export default VerifyPage
