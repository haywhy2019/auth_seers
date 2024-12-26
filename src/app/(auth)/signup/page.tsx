import React from "react"

import { Metadata } from "next"

import SignupForm from "./SignupForm"

export const metadata: Metadata = {
   title: "LafiaEMR - Signup",
   description: "",
}

const Signup = () => {
   return <SignupForm />
}

export default Signup
