"use client"

import { logout } from "@/redux/features/auth.slice"
import { useAppDispatch } from "@/redux/hooks"
import { useMutation } from "@tanstack/react-query"

import React from "react"

import authApi from "@/axios/auth.api"

const Logout = () => {
   const dispatch = useAppDispatch()

   const { mutate: _logout } = useMutation({
      mutationFn: authApi.logout,
      onSuccess: () => dispatch(logout()),
      onError: () => dispatch(logout()),
   })

   React.useEffect(() => {
      _logout()
   }, [])
}

export default Logout
