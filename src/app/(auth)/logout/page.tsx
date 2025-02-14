"use client"

import { logout } from "@/redux/features/auth.slice"
import { useAppDispatch } from "@/redux/hooks"

import React from "react"

const Logout = () => {
   const dispatch = useAppDispatch()

   //TODO: hit logout endpoint here to destroy token

   React.useEffect(() => {
      dispatch(logout())
   }, [dispatch])
}

export default Logout
