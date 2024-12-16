import { Link, Modal, TextInput } from "@carbon/react"

import React, { FC } from "react"

import { useRouter } from "next/navigation"

import { authRoutes } from "@/helpers/routes"

import styles from "../auth.module.scss"

type Props = {
   open: boolean
   setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const VerifyEmailModal: FC<Props> = ({ ...props }) => {
   const [otp, setOtp] = React.useState("")

   const router = useRouter()
   const handleSubmit = () => {
      if (otp.length < 6) return
      router.push(authRoutes.onboarding)
   }
   return (
      <Modal
         open={props.open}
         onRequestClose={() => props.setOpen(false)}
         onRequestSubmit={handleSubmit}
         modalHeading="Enter OTP"
         primaryButtonText="Verify"
         className={styles.auth_verify_modal}
         data-testId="verify-email-component"
      >
         <p>
            Enter the OTP sent to the email you provided during account creation to verify and
            complete the process.
         </p>
         <br />

         <TextInput
            id="otp"
            type="otp"
            name="otp"
            // invalidText={props.errors.email}
            labelText="OTP"
            placeholder="e.g 12345"
            // invalid={!!(props.touched && props.errors.email)}
            onChange={(e) => setOtp(e.target.value)}
            value={otp}
            // onBlur={props.handleBlur}
            size="lg"
            data-modal-primary-focus
            style={{
               marginBottom: "0.5rem",
               borderBottom: "none",
            }}
            data-testId="component-otp-input"
         />
         <p className={styles.auth_verify_timer}>05:00 minutes</p>

         <p>
            Can't find the OTP in your mail? Check your spam or{" "}
            <Link onClick={() => props.setOpen(false)}>Resend OTP</Link>
         </p>
      </Modal>
   )
}

export default VerifyEmailModal
