"use client"

import { Button, FluidForm, PasswordInput, Stack, ToastNotification } from "@carbon/react"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"

import React from "react"

import { useRouter, useSearchParams } from "next/navigation"

import authApi from "@/axios/auth.api"

import { authRoutes } from "@/helpers/routes"

import styles from "../auth.module.scss"
import { resetPasswordSchema } from "../auth.validators"

const CreatePasswordForm = () => {
   const [message, setMessage] = React.useState("")
   const searchParams = useSearchParams()
   const code = searchParams.get("code") as string

   const router = useRouter()

   const {
      mutate: _resetPassword,
      isError,
      isSuccess,
   } = useMutation({
      mutationFn: authApi.resetPassword,
      onSuccess: () => {
         setMessage("Password created successfully")
         router.replace(authRoutes.login)
      },
      onError: (error: any) => {
         setMessage(error.response.data.message || "An error occurred")
      },
   })

   const handleSubmit = (values: Record<string, string>) => {
      _resetPassword({
         code,
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
            <h1 className={styles.auth_heading}>Welcome</h1>
            <p className={styles.auth_description}>
               You are required to create new password before you can proceed.
            </p>
         </div>

         <Formik
            onSubmit={handleSubmit}
            validationSchema={resetPasswordSchema}
            initialValues={{ newPassword: "", confirmPassword: "" }}
            data-testId="create-password-form"
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
                              invalid={!!(props.touched && props.errors.newPassword)}
                              onChange={props.handleChange}
                              value={props.values.newPassword}
                              onBlur={props.handleBlur}
                              size="lg"
                              style={{ borderBottom: "none" }}
                              data-testId="create-password-password-input"
                           />
                           <PasswordInput
                              id="confirmPassword"
                              name="confirmPassword"
                              invalidText={props.errors.confirmPassword}
                              labelText="Confirm Password"
                              placeholder="Type here..."
                              invalid={!!(props.touched && props.errors.confirmPassword)}
                              onChange={props.handleChange}
                              value={props.values.confirmPassword}
                              onBlur={props.handleBlur}
                              size="lg"
                              style={{ borderBottom: "none" }}
                              data-testId="create-password-confirm-password-input"
                           />
                        </Stack>

                        <Button
                           disabled={!props.isValid || !code}
                           style={{ maxWidth: "none", width: "100%" }}
                           kind="primary"
                           type="submit"
                           size="lg"
                           data-testId="create-password-btn"
                        >
                           Create
                        </Button>
                     </Stack>
                  </FluidForm>
               )
            }}
         </Formik>
      </>
   )
}

export default CreatePasswordForm
