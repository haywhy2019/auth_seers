"use client"

import { Button, FluidForm, PasswordInput, Stack, ToastNotification } from "@carbon/react"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"

import React from "react"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import authApi from "@/axios/auth.api"

import { authRoutes } from "@/helpers/routes"

import styles from "../auth.module.scss"
import { resetPasswordSchema } from "../auth.validators"

type Props = {
   createPassword?: boolean
}

const ResetPasswordForm: React.FC<Props> = ({ createPassword }) => {
   const [message, setMessage] = React.useState("")
   const searchParams = useSearchParams()
   const code = searchParams.get("code") as string
   const email = searchParams.get("email") as string

   const router = useRouter()

   const {
      mutate: _resetPassword,
      isError,
      isSuccess,
   } = useMutation({
      mutationFn: authApi.resetPassword,
      onSuccess: () => {
         setMessage(
            createPassword ? "Password created successfully" : "Password reset successfully",
         )
         router.replace(authRoutes.login)
      },
      onError: (error: any) => {
         setMessage(error.response.data.message || "An error occurred")
      },
   })

   const handleSubmit = (values: Record<string, string>) => {
      _resetPassword({
         code,
         email,
         confirmPassword: values.confirmPassword,
         newPassword: values.newPassword,
      })
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
            <h1 className={styles.auth_heading}>
               {createPassword ? "Welcome" : "Create New Password"}
            </h1>
            <p className={styles.auth_description}>
               {createPassword
                  ? "You are required to create a new password before you can proceed."
                  : "Create your new password and proceed to login with it."}
            </p>
         </div>

         <Formik
            onSubmit={handleSubmit}
            validationSchema={resetPasswordSchema}
            initialValues={{ newPassword: "", confirmPassword: "" }}
            data-testId={"reset-password-form"}
         >
            {(props) => {
               return (
                  <FluidForm onSubmit={props.handleSubmit} className={styles.auth_form_container}>
                     <Stack gap={7}>
                        <Stack gap={3}>
                           <PasswordInput
                              id="newPassword"
                              name="newPassword"
                              invalidText={props.errors.newPassword}
                              labelText="Password"
                              placeholder="Type here..."
                              invalid={!!(props.touched.newPassword && props.errors.newPassword)}
                              onChange={props.handleChange}
                              value={props.values.newPassword}
                              onBlur={props.handleBlur}
                              size="lg"
                              style={{ borderBottom: "none" }}
                              data-testId="reset-password-password-input"
                           />
                           <PasswordInput
                              id="confirmPassword"
                              name="confirmPassword"
                              invalidText={props.errors.confirmPassword}
                              labelText="Confirm Password"
                              placeholder="Type here..."
                              invalid={
                                 !!(props.touched.confirmPassword && props.errors.confirmPassword)
                              }
                              onChange={props.handleChange}
                              value={props.values.confirmPassword}
                              onBlur={props.handleBlur}
                              size="lg"
                              style={{ borderBottom: "none" }}
                              data-testId="reset-password-confirm-password-input"
                           />
                        </Stack>

                        <Button
                           disabled={!props.isValid || !code}
                           style={{ maxWidth: "none", width: "100%" }}
                           kind="primary"
                           type="submit"
                           size="lg"
                           data-testId="reset-password-password-btn"
                        >
                           Create
                        </Button>
                     </Stack>
                  </FluidForm>
               )
            }}
         </Formik>

         {!createPassword && (
            <p className={styles.auth_description}>
               Remember your password now?{" "}
               <Link
                  href={authRoutes.login}
                  className={styles.auth_link}
                  data-testId="reset-password-back-login"
               >
                  Back to Login
               </Link>
            </p>
         )}
      </>
   )
}

export default ResetPasswordForm
