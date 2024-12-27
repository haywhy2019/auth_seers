"use client"

import { setAuth } from "@/redux/features/auth.slice"
import { useAppDispatch } from "@/redux/hooks"
import {
   Button,
   FluidForm,
   PasswordInput,
   Stack,
   TextInput,
   ToastNotification,
} from "@carbon/react"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"

import React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import authApi from "@/axios/auth.api"

import { authRoutes } from "@/helpers/routes"
import { getRedirectUrl } from "@/helpers/utils"

import styles from "../auth.module.scss"
import { loginSchema } from "../auth.validators"

const LoginForm = () => {
   const [message, setMessage] = React.useState("")
   const dispatch = useAppDispatch()
   const router = useRouter()

   const {
      mutate: _login,
      isError,
      isSuccess,
   } = useMutation({
      mutationFn: authApi.login,
      onSuccess: ({ data }) => {
         const { role, ...user } = data.data.user
         const userPayload = {
            ...user,
            role: { ...role, permissions: [] }, //remove permissions from payload to declutter the user object before browser storage
         }
         const payload = { token: data.data.token, user: userPayload }

         setMessage("Login Successful")

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
      _login({ userName: values.email, password: values.password })
   }

   return (
      <>
         {(isError || isSuccess) && (
            <ToastNotification
               kind={isError ? "error" : "success"}
               role="status"
               timeout={3000}
               title={message}
               style={{ position: "absolute", top: 40 }}
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
            isInitialValid={false}
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
                              invalid={!!(props.touched && props.errors.email)}
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
                              invalid={!!(props.touched && props.errors.password)}
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
                           disabled={!props.isValid}
                           style={{ maxWidth: "none", width: "100%" }}
                           kind="primary"
                           type="submit"
                           size="lg"
                           data-testId="login-password-button"
                        >
                           Login
                        </Button>
                     </Stack>
                  </FluidForm>
               )
            }}
         </Formik>

         {/* <div className={styles.auth_options}>
            <Image src="/svg/divider.svg" alt="" width={122} height={1} />
            <p>Or login with</p>
            <Image src="/svg/divider.svg" alt="" width={122} height={1} />
         </div>

         <div className={styles.auth_socials_container}>
            <ClickableTile className={styles.auth_socials_tile} data-testId="login-goggle">
               <Image src="/svg/google.svg" alt="Google" width={24} height={24} />
               <p> Google</p>
            </ClickableTile>
            <ClickableTile className={styles.auth_socials_tile} data-testId="login-microsoft">
               <Image src="/svg/microsoft.svg" alt="Microsoft" width={24} height={24} />
               <p>Microsoft</p>
            </ClickableTile>
         </div> */}

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
