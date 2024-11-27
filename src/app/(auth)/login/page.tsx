"use client"

import { Button, FluidForm, PasswordInput, Stack, TextInput } from "@carbon/react"
import { Formik } from "formik"

import React from "react"

import Link from "next/link"

import { authRoutes } from "@/helpers/routes"

import styles from "../auth.module.scss"
import { loginSchema } from "../auth.validators"

const Login = () => {
   const handleSubmit = (values: any) => {}

   return (
      <>
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
                           />

                           <Link href={authRoutes.forgotPassword} className={styles.auth_link}>
                              Forgot Password?
                           </Link>
                        </Stack>

                        <Button
                           disabled={!props.isValid}
                           style={{ maxWidth: "none", width: "100%" }}
                           //  className={styles.button}
                           kind="primary"
                           type="submit"
                           size="lg"
                        >
                           Login
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

export default Login
