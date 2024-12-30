"use client"

import { Button, FluidForm, Stack, TextInput, ToastNotification } from "@carbon/react"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"

import React from "react"

import Link from "next/link"

import authApi from "@/axios/auth.api"

import { authRoutes } from "@/helpers/routes"

import styles from "../auth.module.scss"
import { forgotPasswordSchema } from "../auth.validators"
import VerifyEmailModal from "../components/VerifyEmailModal"

const ForgotPasswordForm = () => {
   const [message, setMessage] = React.useState("")
   const [open, setOpen] = React.useState(false)

   const {
      mutate: _forgotPassword,
      isError,
      isSuccess,
   } = useMutation({
      mutationFn: authApi.forgotPassword,
      onSuccess: () => {
         setMessage("A reset password link was sent to your email address")
      },
      onError: (error: any) => {
         setMessage(error.response.data.message || "An error occurred")
      },
   })

   const handleSubmit = (values: Record<string, string>) => {
      _forgotPassword({ email: values.email })
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
            <h1 className={styles.auth_heading}>Forgot Password</h1>
            <p className={styles.auth_description}>
               Login to manage your patients and their medical records seamlessly.
            </p>
         </div>

         <Formik
            onSubmit={handleSubmit}
            isInitialValid={false}
            validationSchema={forgotPasswordSchema}
            initialValues={{ email: "" }}
            autocomplete="off"
            data-testId="forgot-password-form"
         >
            {(props) => {
               return (
                  <FluidForm onSubmit={props.handleSubmit} className={styles.auth_form_container}>
                     <Stack gap={7}>
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
                           data-testId="forgot-password-email-input"
                        />

                        <Button
                           disabled={!props.isValid}
                           style={{ maxWidth: "none", width: "100%" }}
                           kind="primary"
                           type="submit"
                           size="lg"
                           data-testId="forgot-password-button"
                        >
                           Proceed
                        </Button>
                     </Stack>
                  </FluidForm>
               )
            }}
         </Formik>

         <p className={styles.auth_description}>
            Remember your password now?{" "}
            <Link
               href={authRoutes.login}
               className={styles.auth_link}
               data-testId="forgot-password-back-to-login"
            >
               Back to Login
            </Link>
         </p>

         <VerifyEmailModal open={open} setOpen={setOpen} data-testId="forgot-password-modal" />
      </>
   )
}

export default ForgotPasswordForm
