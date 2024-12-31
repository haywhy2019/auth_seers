"use client"

import { useAppSelector } from "@/redux/hooks"
import { ProgressIndicator, ProgressStep } from "@carbon/react"

import React from "react"

import styles from "./stepper.module.scss"

const OnBoardingSteper = () => {
   const count = useAppSelector((state) => state.onBoard.counter)
   return (
      <ProgressIndicator
         currentIndex={count}
         // onChange={changeIndex}
         className={styles.steper}
         data-testId="onboarding-stepper"
      >
         <ProgressStep label="Products" description="Step 1: select product" />
         <ProgressStep label="Subscription" description="Step 2: Select subscription" />
         <ProgressStep label="Payment" description="Step 3: Make payment" />
         <ProgressStep label="Configuration" description="Step 4: Configure account" />
      </ProgressIndicator>
   )
}

export default OnBoardingSteper
