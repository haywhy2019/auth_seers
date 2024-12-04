"use client"

import { ProgressIndicator, ProgressStep} from "@carbon/react"

import React, { useContext } from "react"

import styles from "./stepper.module.scss"
import StepperContext from "./stepperContext"

const OnBoardingSteper = () => {
   const { index } = StepperContext()

//    const changeIndex = () => {
//    if (index < 4) {
//          setIndex(index + 1)
//    }
//    }
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
