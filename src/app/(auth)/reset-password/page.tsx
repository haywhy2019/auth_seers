"use client"

import { Button, FluidForm, PasswordInput, Stack } from "@carbon/react"
import { Formik } from "formik"

import React from "react"

import Link from "next/link"

import { authRoutes } from "@/helpers/routes"

import styles from "../auth.module.scss"
import { resetPasswordSchema } from "../auth.validators"

const ResetPassword = () => {
   const handleSubmit = (values: any) => {}

   return (
      <>
         <div className={styles.auth_heading_container}>
            <h1 className={styles.auth_heading}>Create New Password</h1>
            <p className={styles.auth_description}>
               Create your new password and proceed to login with it.
            </p>
         </div>

         <Formik
            onSubmit={handleSubmit}
            isInitialValid={false}
            validationSchema={resetPasswordSchema}
            initialValues={{ password: "", confirmPassword: "" }}
         >
            {(props) => {
               return (
                  <FluidForm onSubmit={props.handleSubmit} className={styles.auth_form_container}>
                     <Stack gap={7}>
                        <Stack gap={3}>
                           <PasswordInput
                              id="password"
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
                           />
                        </Stack>

                        <Button
                           disabled={!props.isValid}
                           style={{ maxWidth: "none", width: "100%" }}
                           //  className={styles.button}
                           kind="primary"
                           type="submit"
                           size="lg"
                        >
                           Create
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
      </>
   )
}

export default ResetPassword
