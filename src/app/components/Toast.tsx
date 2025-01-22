import { ToastNotification, ToastNotificationProps } from "@carbon/react"

import React from "react"

const Toast: React.FC<ToastNotificationProps> = ({ ...props }) => {
   return (
      <ToastNotification
         {...props}
         role="status"
         timeout={3000}
         style={{ position: "absolute", top: 40 }}
      />
   )
}

export default Toast
