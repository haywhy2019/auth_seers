import { Modal } from "@carbon/react"

import React, { FC } from "react"

type Props = {
   open: boolean
   close: () => void
}

const VerifyOtpSuccessModal: FC<Props> = ({ ...props }) => {
   return (
      <Modal
         open={props.open}
         onRequestClose={props.close}
         onRequestSubmit={props.close}
         modalHeading="OTP Verified Successfully"
         primaryButtonText="Login"
         data-testId="verify-otp-success"
      >
         <p>OTP verification was successful. Kindly proceed to login</p>
      </Modal>
   )
}

export default VerifyOtpSuccessModal
