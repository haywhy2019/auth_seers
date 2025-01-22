"use client"

import Toast from "@/app/components/Toast"
import { authSelector, logout, setAuth } from "@/redux/features/auth.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
   Button,
   Link as CarbonLink,
   FluidForm,
   InlineLoading,
   Link,
   Stack,
   TextInput,
} from "@carbon/react"
import { useMutation } from "@tanstack/react-query"
import { Formik } from "formik"
import Cookies from "js-cookie"

import React from "react"

import { useRouter } from "next/navigation"

import authApi from "@/axios/auth.api"

import { userStatus } from "@/helpers/enum"
import { getRedirectUrl } from "@/helpers/utils"

import styles from "../auth.module.scss"
import { otpSchema } from "../auth.validators"

const VerifyForm = () => {
   const [message, setMessage] = React.useState("")

   const COUNTDOWN_TIME = 5 * 60 // 5 minutes in seconds
   const [timeLeft, setTimeLeft] = React.useState(0)
   const [canResend, setCanResend] = React.useState(true)

   const user = useAppSelector(authSelector).user
   const dispatch = useAppDispatch()
   const router = useRouter()

   const token = Cookies.get("token") && JSON.parse(Cookies.get("token") || "")

   const handleLogout = () => dispatch(logout())

   const {
      mutate: _verifyOtp,
      isError,
      isSuccess,
      isPending,
   } = useMutation({
      mutationFn: authApi.verifyOtp,
      onSuccess: () => {
         if (token) {
            setMessage("Email verified successfully")
            const updatedUser = { ...user, status: userStatus.ACTIVE }
            const payload = { token, user: updatedUser }
            dispatch(setAuth(payload))
            const redirectUrl = getRedirectUrl(updatedUser)
            router.push(redirectUrl!)
         } else {
            setMessage("Email verified successfully. Please Login")
            handleLogout()
         }
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
         setMessage("OTP resent successfully")
         setTimeLeft(COUNTDOWN_TIME)
         setCanResend(false)
      },
      onError: (error: any) => {
         setMessage(error.response.data.message || "An error occurred")
      },
   })

   const handleSubmit = (values: Record<string, string>) => {
      _verifyOtp({ email: user?.email, otp: values.otp })
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
         {(isError || isSuccess) && (
            <Toast
               kind={isError ? "error" : "success"}
               title={message || (isError ? "An error occurred" : "Success")}
            />
         )}

         {(resendError || resendSuccess) && (
            <Toast
               kind={resendError ? "error" : "success"}
               title={message || (resendError ? "An error occurred" : "Success")}
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
                           invalid={!!(props.touched.otp && props.errors.otp)}
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
                           disabled={!props.isValid || isPending}
                           style={{ maxWidth: "none", width: "100%" }}
                           kind="primary"
                           type="submit"
                           size="lg"
                           data-testId="verify-email-button"
                        >
                           {isPending ? <InlineLoading description="Verifying..." /> : "Verify"}
                        </Button>
                     </Stack>
                  </FluidForm>
               )
            }}
         </Formik>

         <p className={styles.auth_description}>
            Something happened?{" "}
            <Link className={styles.auth_link} onClick={handleLogout}>
               Logout
            </Link>
         </p>
      </>
   )
}

export default VerifyForm
