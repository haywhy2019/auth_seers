"use client"

import { Button, FluidForm, Stack, TextInput } from "@carbon/react"
import { Formik } from "formik"

import React, { useState } from "react"

import Link from "next/link"

import { authRoutes } from "@/helpers/routes"

import styles from "../auth.module.scss"
import { forgotPasswordSchema } from "../auth.validators"
import VerifyEmailModal from "../components/VerifyEmailModal"

const ForgotPassword = () => {
   const [open, setOpen] = useState(false)

   const handleSubmit = () =>
      // values: any
      {
         setOpen(true)
      }

   return (
      <>
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
                           invalid={!!(props.touched && props.errors.email)}
                           onChange={props.handleChange}
                           value={props.values.email}
                           onBlur={props.handleBlur}
                           size="lg"
                           style={{ borderBottom: "none" }}
                        />

                        <Button
                           disabled={!props.isValid}
                           style={{ maxWidth: "none", width: "100%" }}
                           kind="primary"
                           type="submit"
                           size="lg"
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
            <Link href={authRoutes.login} className={styles.auth_link}>
               Back to Login
            </Link>
         </p>

         <VerifyEmailModal open={open} setOpen={setOpen} />
      </>
   )
}

export default ForgotPassword
