"use client"

import { authSelector } from "@/redux/features/auth.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
   Button,
   Link as CarbonLink,
   FluidForm,
   Stack,
   TextInput,
   ToastNotification,
} from "@carbon/react"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"

import React from "react"

import Image from "next/image"
import Link from "next/link"

// import { useRouter } from "next/navigation"
import authApi from "@/axios/auth.api"

import { authRoutes } from "@/helpers/routes"

import styles from "../auth.module.scss"
import { otpSchema } from "../auth.validators"

const VerifyForm = () => {
   const [message, setMessage] = React.useState("")

   const COUNTDOWN_TIME = 5 * 60 // 5 minutes in seconds
   const [timeLeft, setTimeLeft] = React.useState(0)
   const [canResend, setCanResend] = React.useState(true)

   const user = useAppSelector(authSelector).user
   const dispatch = useAppDispatch()
   // const router = useRouter()

   const {
      mutate: _verifyOtp,
      isError,
      isSuccess,
   } = useMutation({
      mutationFn: authApi.verifyOtp,
      onSuccess: ({ data }) => {
         console.log(data, "data")
         // const { role, ...user } = data.data.user
         // const userPayload = {
         //    ...user,
         //    role: { ...role, permissions: [] }, //remove permissions from payload to declutter the user object before browser storage
         // }
         // const payload = { token: data.data.token, user: userPayload }

         // setMessage("Login Successful")

         // dispatch(setAuth(payload))
         // const redirectUrl = getRedirectUrl(data.data.user)
         // router.push(redirect || redirectUrl!)
      },
      onError: (error: any) => {
         setMessage(error.response.data.message)
      },
   })

   const {
      mutate: _resendOtp,
      isError: resendError,
      isSuccess: resendSuccess,
   } = useMutation({
      mutationFn: authApi.resendOtp,
      onSuccess: () => {
         setTimeLeft(COUNTDOWN_TIME)
         setCanResend(false)
         setMessage("OTP resent successfully")
      },
      onError: (error: any) => {
         setMessage(error.response.data.message || "An error occurred")
      },
   })

   const handleSubmit = (values: Record<string, string>) => {
      _verifyOtp({ userName: user?.userName, otp: values.otp })
   }

   const handleResendOTP = () => {
      _resendOtp({ email: user?.email })
   }

   React.useEffect(() => {
      // Start countdown only if time is not up
      if (timeLeft > 0) {
         const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
               if (prevTime <= 1) {
                  clearInterval(timer)
                  setCanResend(true)
                  return 0
               }
               return prevTime - 1
            })
         }, 1000)

         return () => clearInterval(timer)
      }
   }, [timeLeft])

   const formatTime = (seconds: number) => {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
   }

   return (
      <>
         {(isError || isSuccess || resendError || resendSuccess) && (
            <ToastNotification
               kind={isError ? "error" : "success"}
               role="status"
               timeout={3000}
               title={message}
               style={{ position: "absolute", top: 40 }}
            />
         )}
         <div className={styles.auth_heading_container}>
            <h1 className={styles.auth_heading}>Enter OTP</h1>
            <p className={styles.auth_description}>
               Enter the OTP sent to the email you provided during account creation to verify and
               complete the process.
            </p>
         </div>

         <Formik
            onSubmit={handleSubmit}
            validationSchema={otpSchema}
            initialValues={{ otp: "" }}
            data-testId="verify-form"
         >
            {(props) => {
               return (
                  <FluidForm onSubmit={props.handleSubmit} className={styles.auth_form_container}>
                     <Stack gap={7}>
                        <TextInput
                           id="otp"
                           type="otp"
                           name="otp"
                           invalidText={props.errors.otp}
                           labelText="OTP"
                           placeholder="e.g 123456"
                           invalid={!!(props.touched && props.errors.otp)}
                           onChange={props.handleChange}
                           value={props.values.otp}
                           onBlur={props.handleBlur}
                           size="lg"
                           style={{ borderBottom: "none" }}
                           data-testId="verify-email-otp"
                           maxLength={6}
                        />

                        <div>
                           {timeLeft > 0 && (
                              <p
                                 className={styles.auth_verify_timer}
                                 data-testId="verify-email-timer"
                              >
                                 {formatTime(timeLeft)} minutes
                              </p>
                           )}
                           <p className={styles.auth_description}>
                              Can't find the OTP in your mail? Check your spam or{" "}
                              <CarbonLink
                                 className={styles.auth_link}
                                 onClick={canResend ? handleResendOTP : null}
                                 style={{ cursor: !canResend && "not-allowed" }}
                              >
                                 Resend OTP
                              </CarbonLink>
                           </p>
                        </div>

                        <Button
                           disabled={!props.isValid}
                           style={{ maxWidth: "none", width: "100%" }}
                           kind="primary"
                           type="submit"
                           size="lg"
                           data-testId="verify-email-button"
                        >
                           Verify
                        </Button>
                     </Stack>
                  </FluidForm>
               )
            }}
         </Formik>
      </>
   )
}

export default VerifyForm
