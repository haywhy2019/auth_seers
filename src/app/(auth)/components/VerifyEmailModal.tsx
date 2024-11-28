import { Link, Modal, TextInput } from "@carbon/react"

import React, { FC } from "react"

import styles from "../auth.module.scss"

type Props = {
   open: boolean
   setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const VerifyEmailModal: FC<Props> = ({ ...props }) => {
   return (
      <Modal
         open={props.open}
         onRequestClose={() => props.setOpen(false)}
         modalHeading="Enter OTP"
         primaryButtonText="Verify"
         className={styles.auth_verify_modal}
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
            // onChange={props.handleChange}
            // value={props.values.email}
            // onBlur={props.handleBlur}
            size="lg"
            data-modal-primary-focus
            style={{
               marginBottom: "0.5rem",
               borderBottom: "none",
            }}
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
