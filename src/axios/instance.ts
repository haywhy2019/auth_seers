/** @format */
import axios from "axios"
import Cookies from "js-cookie"
import { toast } from "react-toastify"

export const BASEURL = process.env.NEXT_PUBLIC_BASEURL

const publicInstance = axios.create({
   baseURL: BASEURL,
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   },
})

const privateInstance = axios.create({
   baseURL: BASEURL,
   headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
   },
})

const formDataInstance = axios.create({
   baseURL: BASEURL,
   headers: {
      Accept: "*/*",
      "Content-Type": "multipart/form-data;boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
   },
})

//request interceptors
privateInstance.interceptors.request.use((config: any) => {
   const token = JSON.parse(Cookies.get("auth") || "").accessToken

   if (token) {
      config.headers.Authorization = `Bearer ${token}`
   }

   return config
})

//response interceptors
publicInstance.interceptors.response.use(
   (response) => {
      return response
   },
   (error) => {
      // _handleError(error)
      const message = error.response.data.message
      if (Array.isArray(message)) {
         message.forEach((item: string) => {
            toast.error(item)
         })
         return
      }
      toast.error(error.response.data.message)
      throw error
   },
)

privateInstance.interceptors.response.use(
   (response) => {
      return response
   },
   (error) => {
      // _handleError(error)
      throw error
   },
)

formDataInstance.interceptors.response.use(
   (response) => {
      return response
   },
   (error) => {
      // _handleError(error)
      throw error
   },
)

export { publicInstance, privateInstance, formDataInstance }
