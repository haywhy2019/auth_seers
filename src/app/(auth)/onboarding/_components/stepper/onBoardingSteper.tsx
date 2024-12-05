"use client"

import { ProgressIndicator, ProgressStep } from "@carbon/react"

import React from "react"

import styles from "./stepper.module.scss"
import StepperContext from "./stepperContext"

const OnBoardingSteper = () => {
   const { index } = StepperContext()
   return (
      <ProgressIndicator
         currentIndex={index}
         // onChange={changeIndex}
         className={styles.steper}
      >
         <ProgressStep label="Products" description="Step 1: select product" />
         <ProgressStep label="Subscription" description="Step 2: Select subscription" />
         <ProgressStep label="Payment" description="Step 3: Make payment" />
         <ProgressStep label="Configuration" description="Step 4: Configure account" />
      </ProgressIndicator>
   )
}

export default OnBoardingSteper
