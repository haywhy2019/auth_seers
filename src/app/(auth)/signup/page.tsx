"use client"

import {
   Button,
   Link as CarbonLink,
   ClickableTile,
   Column,
   Dropdown,
   FluidForm,
   Form,
   Grid,
   PasswordInput,
   Select,
   SelectItem,
   Stack,
   TextInput,
   Toggletip,
   ToggletipButton,
   ToggletipContent,
   ToggletipLabel,
} from "@carbon/react"
import { Help } from "@carbon/react/icons"
import FluidSelect from "@carbon/react/lib/components/FluidSelect"
import { Formik } from "formik"

import React, { useState } from "react"

import Image from "next/image"
import Link from "next/link"

import { authRoutes } from "@/helpers/routes"

import styles from "../auth.module.scss"
import { signupSchema } from "../auth.validators"
import VerifyEmailModal from "../components/VerifyEmailModal"

const Signup = () => {
   const [open, setOpen] = useState(false)

   const handleSubmit = (values: any) => {
      setOpen(true)
   }

   return (
      <>
         <div className={styles.auth_heading_container}>
            <h1 className={styles.auth_heading}>Create Account</h1>
            <p className={styles.auth_description}>
               Register to easily manage patient details and medical records without hassle.
            </p>
         </div>

         <Formik
            onSubmit={handleSubmit}
            isInitialValid={false}
            validationSchema={signupSchema}
            initialValues={{ name: "", type: "", email: "", password: "", confirmPassword: "" }}
         >
            {(props) => {
               return (
                  <FluidForm onSubmit={props.handleSubmit} className={styles.auth_form_container}>
                     <Stack gap={7}>
                        <Stack gap={3}>
                           <div className={styles.auth_2_columns_container}>
                              <FluidSelect
                                 id="type"
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
                                 invalidText={props.errors.type}
                                 invalid={!!(props.touched && props.errors.type)}
                                 onChange={props.handleChange}
                                 className={styles.auth_select}
                              >
                                 <SelectItem value="" text="Select" />
                                 <SelectItem value="hospital" text="Hospital" />
                                 <SelectItem value="laboratory" text="Laboratory" />
                                 <SelectItem value="clinic" text="Clinic" />
                              </FluidSelect>

                              <TextInput
                                 id="name"
                                 name="name"
                                 invalidText={props.errors.name}
                                 labelText="Organisation Name"
                                 placeholder="e.g Acme Corp"
                                 invalid={!!(props.touched && props.errors.name)}
                                 onChange={props.handleChange}
                                 value={props.values.name}
                                 onBlur={props.handleBlur}
                                 size="lg"
                                 style={{ borderBottom: "none" }}
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
                        >
                           Create Account
                        </Button>
                     </Stack>
                  </FluidForm>
               )
            }}
         </Formik>

         <div className={styles.auth_options}>
            <Image src="/svg/divider.svg" alt="" width={122} height={1} />
            <p>Or sign up with</p>
            <Image src="/svg/divider.svg" alt="" width={122} height={1} />
         </div>

         <div className={styles.auth_socials_container}>
            <ClickableTile className={styles.auth_socials_tile}>
               <Image src="/svg/google.svg" alt="Google" width={24} height={24} />
               <p> Google</p>
            </ClickableTile>
            <ClickableTile className={styles.auth_socials_tile}>
               <Image src="/svg/microsoft.svg" alt="Microsoft" width={24} height={24} />
               <p>Microsoft</p>
            </ClickableTile>
         </div>

         <p className={styles.auth_description}>
            Already have an account?{" "}
            <Link href={authRoutes.login} className={styles.auth_link}>
               Kindly Login
            </Link>
         </p>

         <VerifyEmailModal open={open} setOpen={setOpen} />
      </>
   )
}

export default Signup
