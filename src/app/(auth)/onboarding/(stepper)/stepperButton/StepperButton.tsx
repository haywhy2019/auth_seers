import { Button, InlineLoading } from "@carbon/react"

import React from "react"

import Link from "next/link"

import { authRoutes } from "@/helpers/routes"

import styles from "./stepperButton.module.scss"

function StepperButton({
   onClick,
   loading,
   buttonText,
}: {
   onClick: () => void
   loading: boolean
   buttonText: string
}) {
   return (
      <div>
         <div className={styles.subscription_button}>
            <Button
               className={styles.sub_btn}
               size="lg"
               onClick={onClick}
               data-testId="onboarding-subscription-btn"
            >
               {loading && <InlineLoading />}
               {buttonText}
            </Button>
         </div>

         <div className={styles.logout_container}>
            <p className={styles.logout_text1}>Something happened? </p>
            <Link className={styles.logout_text2} href={authRoutes.logout}>
               Logout
            </Link>
         </div>
      </div>
   )
}

export default StepperButton
