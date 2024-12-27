"use client"

import { setAuth } from "@/redux/features/auth.slice"
import { useAppDispatch } from "@/redux/hooks"
import {
   Button,
   Link as CarbonLink,
   FluidForm,
   PasswordInput,
   SelectItem,
   Stack,
   TextInput,
   ToastNotification,
   Toggletip,
   ToggletipButton,
   ToggletipContent,
   ToggletipLabel,
} from "@carbon/react"
import { Help } from "@carbon/react/icons"
import FluidSelect from "@carbon/react/lib/components/FluidSelect"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"

import React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import authApi from "@/axios/auth.api"

import { organizationTypes } from "@/helpers/constants"
import { authRoutes } from "@/helpers/routes"

import { User } from "@/types/general.types"

import styles from "../auth.module.scss"
import { signupSchema } from "../auth.validators"

const SignupForm = () => {
   const [message, setMessage] = React.useState("")

   const dispatch = useAppDispatch()
   const router = useRouter()

   const {
      mutate: _signup,
      isError,
      isSuccess,
   } = useMutation({
      mutationFn: authApi.signup,
      onSuccess: ({ data }) => {
         setMessage("Signup Successful")
         //eslint-disable-next-line
         const { role, ...user } = data.data.userDto
         const payload = { token: null, user }
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
            }}
            data-testId="signup-form"
         >
            {(props) => {
               return (
                  <FluidForm onSubmit={props.handleSubmit} className={styles.auth_form_container}>
                     <Stack gap={7}>
                        <Stack gap={3}>
                           <div className={styles.auth_2_columns_container}>
                              {/* <Dropdown
                                 id="organizationType"
                                 titleText="Facility Type"
                                 helperText="Facility Type"
                                 label="Select type"
                                 items={organizationTypes.map((item) => item.display)}
                                 itemToString={(item) => (item ? item : "")}
                                 onChange={props.handleChange}
                              /> */}
                              <FluidSelect
                                 id="organizationType"
                                 labelText={
                                    <div
                                       style={{
                                          display: "flex",
                                          alignItems: "center",
                                          maxWidth: "fit-content",
                                       }}
                                    >
                                       <ToggletipLabel>Facility Type</ToggletipLabel>
                                       <Toggletip>
                                          <ToggletipButton label="Show information">
                                             <Help />
                                          </ToggletipButton>
                                          <ToggletipContent>
                                             <p>
                                                Lorem ipsum dolor sit amet, di os consectetur
                                                adipiscing elit, sed do eiusmod tempor incididunt ut
                                                fsil labore et dolore magna aliqua.
                                             </p>
                                          </ToggletipContent>
                                       </Toggletip>
                                    </div>
                                 }
                                 invalidText={props.errors.organizationType}
                                 invalid={!!(props.touched && props.errors.organizationType)}
                                 onChange={props.handleChange}
                                 className={styles.auth_select}
                              >
                                 <SelectItem value="" text="Select" data-testId="signup-select1" />
                                 {organizationTypes.map((item) => (
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
                                 invalid={!!(props.touched && props.errors.organizationName)}
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
                              invalid={!!(props.touched && props.errors.email)}
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
                                 invalid={!!(props.touched && props.errors.password)}
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
                                 invalid={!!(props.touched && props.errors.confirmPassword)}
                                 onChange={props.handleChange}
                                 value={props.values.confirmPassword}
                                 onBlur={props.handleBlur}
                                 size="lg"
                                 style={{ borderBottom: "none" }}
                                 autoComplete="off"
                                 data-testId="signup-confirm-password-input"
                              />
                           </div>
                        </Stack>

                        <p className={styles.auth_description}>
                           By Creating an account, you agree to Lafialink's{" "}
                           <CarbonLink href="#" target="_blank" rel="noreferrer">
                              Terms of Service
                           </CarbonLink>{" "}
                           and{" "}
                           <CarbonLink href="#" target="_blank" rel="noreferrer">
                              Privacy Policy
                           </CarbonLink>
                        </p>

                        <Button
                           disabled={!props.isValid}
                           style={{ maxWidth: "none", width: "100%" }}
                           kind="primary"
                           type="submit"
                           size="lg"
                           data-testId="signup-btn"
                        >
                           Create Account
                        </Button>
                     </Stack>
                  </FluidForm>
               )
            }}
         </Formik>

         {/* <div className={styles.auth_options}>
            <Image src="/svg/divider.svg" alt="" width={122} height={1} />
            <p>Or sign up with</p>
            <Image src="/svg/divider.svg" alt="" width={122} height={1} />
         </div>

         <div className={styles.auth_socials_container}>
            <ClickableTile className={styles.auth_socials_tile} data-testId="signup-goggle">
               <Image src="/svg/google.svg" alt="Google" width={24} height={24} />
               <p> Google</p>
            </ClickableTile>
            <ClickableTile className={styles.auth_socials_tile} data-testId="signup-microsoft">
               <Image src="/svg/microsoft.svg" alt="Microsoft" width={24} height={24} />
               <p>Microsoft</p>
            </ClickableTile>
         </div> */}

         <p className={styles.auth_description}>
            Already have an account?{" "}
            <Link href={authRoutes.login} className={styles.auth_link}>
               Kindly Login
            </Link>
         </p>
      </>
   )
}

export default SignupForm
