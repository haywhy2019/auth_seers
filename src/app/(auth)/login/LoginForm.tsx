"use client"

import Toast from "@/app/components/Toast"
import { setAuth } from "@/redux/features/auth.slice"
import { useAppDispatch } from "@/redux/hooks"
import { Button, FluidForm, InlineLoading, PasswordInput, Stack, TextInput } from "@carbon/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { Formik } from "formik"

import React from "react"

import Link from "next/link"
import { redirect, useRouter, useSearchParams } from "next/navigation"

import authApi from "@/axios/auth.api"

import { authRoutes } from "@/helpers/routes"
import { getRedirectUrl } from "@/helpers/utils"

import styles from "../auth.module.scss"
import { loginSchema } from "../auth.validators"

const LoginForm = () => {
   const [message, setMessage] = React.useState("")
   const dispatch = useAppDispatch()
   const router = useRouter()

   const searchParams = useSearchParams()
   const prompt = searchParams.get("prompt") as string
   const continueUrl = searchParams.get("continue") as string

   const {
      mutate: _login,
      isError,
      isSuccess,
      isPending,
   } = useMutation({
      mutationFn: authApi.login,
      onSuccess: ({ data }) => {
         const { role, ...user } = data.data.user
         const userPayload = {
            ...user,
            role: { ...role, permissions: [] }, //remove permissions from payload to declutter the user object before browser storage
         }
         const payload = { token: data.data.token, user: userPayload }

         setMessage("Login successful")

         dispatch(setAuth(payload))
         const redirectUrl = getRedirectUrl(data.data.user)
         // router.push(redirect || redirectUrl!)
         router.push(redirectUrl!)
      },
      onError: (error: any) => {
         setMessage(error.response.data.message || "An error occurred")
      },
   })

   const handleSubmit = (values: Record<string, string>) => {
      _login({ email: values.email, password: values.password })
   }

   const {
      data: encodedData,
      isSuccess: lafiaHMSSuccess,
      isError: lafiaHMSError,
   } = useQuery({
      queryKey: ["login"],
      queryFn: () => authApi.lafiaHMSLogin(),
      enabled: !!(prompt && continueUrl),
   })

   React.useEffect(() => {
      if (lafiaHMSSuccess) {
         const base64Data = encodedData?.data?.data
         if (base64Data) {
            redirect(`${continueUrl!}?accessToken=${base64Data}`)
         } else {
            redirect(authRoutes.login)
         }
      }
      if (lafiaHMSError) redirect(authRoutes.login)
   }, [lafiaHMSSuccess, lafiaHMSError])

   if (prompt && continueUrl) return

   return (
      <>
         {(isError || isSuccess) && (
            <Toast
               kind={isError ? "error" : "success"}
               title={message || (isError ? "An error occurred" : "Success")}
            />
         )}
         <div className={styles.auth_heading_container}>
            <h1 className={styles.auth_heading}>Login</h1>
            <p className={styles.auth_description}>
               Login to manage your patients and their medical records seamlessly.
            </p>
         </div>

         <Formik
            onSubmit={handleSubmit}
            validationSchema={loginSchema}
            initialValues={{ email: "", password: "" }}
            data-testId="login-form"
         >
            {(props) => {
               return (
                  <FluidForm onSubmit={props.handleSubmit} className={styles.auth_form_container}>
                     <Stack gap={7}>
                        <Stack gap={3}>
                           <TextInput
                              id="name"
                              type="email"
                              name="email"
                              invalidText={props.errors.email}
                              labelText="Email Address"
                              placeholder="e.g joe@acmecorp.com"
                              invalid={!!(props.touched.email && props.errors.email)}
                              onChange={props.handleChange}
                              value={props.values.email}
                              onBlur={props.handleBlur}
                              size="lg"
                              style={{ borderBottom: "none" }}
                              data-testId="login-email-input"
                           />

                           <PasswordInput
                              id="password"
                              type="password"
                              name="password"
                              invalidText={props.errors.password}
                              labelText="Password"
                              placeholder="Type here..."
                              invalid={!!(props.touched.password && props.errors.password)}
                              onChange={props.handleChange}
                              value={props.values.password}
                              onBlur={props.handleBlur}
                              size="lg"
                              style={{ borderBottom: "none" }}
                              data-testId="login-password-input"
                           />

                           <div style={{ display: "flex", justifyContent: "end" }}>
                              <Link
                                 href={authRoutes.forgotPassword}
                                 className={styles.auth_link}
                                 data-testId="login-password-forgot-password-link"
                              >
                                 Forgot Password?
                              </Link>
                           </div>
                        </Stack>

                        <Button
                           disabled={!props.isValid || isPending}
                           style={{ maxWidth: "none", width: "100%" }}
                           kind="primary"
                           type="submit"
                           size="lg"
                           data-testId="login-password-button"
                        >
                           {isPending ? <InlineLoading description="Logging in..." /> : "Login"}
                        </Button>
                     </Stack>
                  </FluidForm>
               )
            }}
         </Formik>

         <p className={styles.auth_description}>
            You do not have an account?{" "}
            <Link href={authRoutes.signup} className={styles.auth_link}>
               Kindly Create Account
            </Link>
         </p>
      </>
   )
}

export default LoginForm
