"use client"

import Toast from "@/app/components/Toast"
import { setAuth } from "@/redux/features/auth.slice"
import { useAppDispatch } from "@/redux/hooks"
import {
   Button,
   Link as CarbonLink,
   FluidForm,
   InlineLoading,
   PasswordInput,
   SelectItem,
   Stack,
   TextInput,
} from "@carbon/react"
import FluidSelect from "@carbon/react/lib/components/FluidSelect"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"

import React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import authApi from "@/axios/auth.api"

import { organizationTypeOptions } from "@/helpers/constants"
import { authRoutes } from "@/helpers/routes"

import { User } from "@/types/general.types"

import styles from "../auth.module.scss"
import { signupSchema } from "../auth.validators"
import PasswordCriteria from "./PasswordCriteria"

const SignupForm = () => {
   const [message, setMessage] = React.useState("")

   const dispatch = useAppDispatch()
   const router = useRouter()

   const {
      mutate: _signup,
      isError,
      isSuccess,
      isPending,
   } = useMutation({
      mutationFn: authApi.signup,
      onSuccess: ({ data }) => {
         setMessage("Signup successful")
         //eslint-disable-next-line
         const { role, ...user } = data.data.userDto
         const payload = { user }
         dispatch(setAuth(payload))
         router.push(authRoutes.verify)
      },
      onError: (error: any) => {
         setMessage(error.response.data.message || "An error occurred")
      },
   })

   const handleSubmit = (values: Record<string, string>) => {
      _signup({
         organizationType: values.organizationType as User["organizationType"],
         organizationName: values.organizationName,
         email: values.email,
         password: values.password,
         confirmPassword: values.confirmPassword,
         firstName: values.firstName,
         lastName: values.lastName,
      })
   }

   return (
      <>
         {(isError || isSuccess) && (
            <Toast
               kind={isError ? "error" : "success"}
               title={message || (isError ? "An error occurred" : "Success")}
               data-testId="signup-toast"
            />
         )}

         <div className={styles.auth_heading_container}>
            <h1 className={styles.auth_heading}>Create Account</h1>
            <p className={styles.auth_description}>
               Register to easily manage patient details and medical records without hassle.
            </p>
         </div>

         <Formik
            onSubmit={handleSubmit}
            validationSchema={signupSchema}
            initialValues={{
               organizationName: "",
               organizationType: "",
               email: "",
               password: "",
               confirmPassword: "",
               firstName: "",
               lastName: "",
            }}
            data-testId="signup-form"
         >
            {(props) => {
               return (
                  <FluidForm onSubmit={props.handleSubmit} className={styles.auth_form_container}>
                     <Stack gap={7}>
                        <Stack gap={3}>
                           <div className={styles.auth_2_columns_container}>
                              <TextInput
                                 id="firstName"
                                 name="firstName"
                                 invalidText={props.errors.firstName}
                                 labelText="First Name"
                                 placeholder="Type here.."
                                 invalid={!!(props.touched.firstName && props.errors.firstName)}
                                 onChange={props.handleChange}
                                 value={props.values.firstName}
                                 onBlur={props.handleBlur}
                                 size="lg"
                                 style={{ borderBottom: "none" }}
                                 autoComplete="off"
                                 data-testId="signup-firstName-input"
                              />
                              <TextInput
                                 id="lastName"
                                 name="lastName"
                                 invalidText={props.errors.lastName}
                                 labelText="Last Name"
                                 placeholder="Type here.."
                                 invalid={!!(props.touched.lastName && props.errors.lastName)}
                                 onChange={props.handleChange}
                                 value={props.values.lastName}
                                 onBlur={props.handleBlur}
                                 size="lg"
                                 style={{ borderBottom: "none" }}
                                 autoComplete="off"
                                 data-testId="signup-lastName-input"
                              />
                           </div>

                           <div className={styles.auth_2_columns_container_select}>
                              <FluidSelect
                                 id="organizationType"
                                 labelText="Facility Type"
                                 invalidText={props.errors.organizationType}
                                 invalid={
                                    !!(
                                       props.touched.organizationType &&
                                       props.errors.organizationType
                                    )
                                 }
                                 onChange={props.handleChange}
                                 className={styles.auth_select}
                                 data-testid="facility-type-select"
                              >
                                 <SelectItem value="" text="Select" data-testId="signup-select1" />
                                 {organizationTypeOptions.map((item) => (
                                    <SelectItem
                                       key={item.value}
                                       value={item.value}
                                       text={item.display}
                                       data-testId={`signup-select-${item.value}`}
                                    />
                                 ))}
                              </FluidSelect>

                              <TextInput
                                 id="organizationName"
                                 name="organizationName"
                                 invalidText={props.errors.organizationName}
                                 labelText="Organisation Name"
                                 placeholder="e.g Acme Corp"
                                 invalid={
                                    !!(
                                       props.touched.organizationName &&
                                       props.errors.organizationName
                                    )
                                 }
                                 onChange={props.handleChange}
                                 value={props.values.organizationName}
                                 onBlur={props.handleBlur}
                                 size="lg"
                                 style={{ borderBottom: "none" }}
                                 data-testId="signup-name-input"
                              />
                           </div>

                           <TextInput
                              id="name"
                              type="email"
                              name="email"
                              invalidText={props.errors.email}
                              labelText="Admin Email Address"
                              placeholder="e.g joe@acmecorp.com"
                              invalid={!!(props.touched.email && props.errors.email)}
                              onChange={props.handleChange}
                              value={props.values.email}
                              onBlur={props.handleBlur}
                              size="lg"
                              style={{ borderBottom: "none" }}
                              autoComplete="off"
                              data-testId="signup-email-input"
                           />

                           <div className={styles.auth_2_columns_container}>
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
                                 autoComplete="off"
                                 data-testId="signup-password-input"
                              />

                              <PasswordInput
                                 id="confirmPassword"
                                 name="confirmPassword"
                                 invalidText={props.errors.confirmPassword}
                                 labelText="Confirm Password"
                                 placeholder="Type here..."
                                 invalid={
                                    !!(
                                       props.touched.confirmPassword && props.errors.confirmPassword
                                    )
                                 }
                                 onChange={props.handleChange}
                                 value={props.values.confirmPassword}
                                 onBlur={props.handleBlur}
                                 size="lg"
                                 style={{ borderBottom: "none" }}
                                 autoComplete="off"
                                 data-testId="signup-confirm-password-input"
                              />
                           </div>

                           <PasswordCriteria password={props.values.password} />
                        </Stack>

                        <p className={styles.auth_description}>
                           By Creating an account, you agree to Lafialink's{" "}
                           <CarbonLink
                              href="#"
                              target="_blank"
                              rel="noreferrer"
                              data-testId="signup-terms"
                           >
                              Terms of Service
                           </CarbonLink>{" "}
                           and{" "}
                           <CarbonLink
                              href="#"
                              target="_blank"
                              rel="noreferrer"
                              data-testId="signup-privacy"
                           >
                              Privacy Policy
                           </CarbonLink>
                        </p>

                        <Button
                           disabled={!props.isValid || isPending}
                           style={{ maxWidth: "none", width: "100%" }}
                           kind="primary"
                           type="submit"
                           size="lg"
                           data-testId="signup-btn"
                        >
                           {isPending ? (
                              <InlineLoading description="Creating Account..." />
                           ) : (
                              "Create Account"
                           )}
                        </Button>
                     </Stack>
                  </FluidForm>
               )
            }}
         </Formik>

         <p className={styles.auth_description}>
            Already have an account?{" "}
            <Link
               href={authRoutes.login}
               className={styles.auth_link}
               data-testId="signup-login-link"
            >
               Kindly Login
            </Link>
         </p>
      </>
   )
}

export default SignupForm
