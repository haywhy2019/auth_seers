"use client"

import { useAppSelector } from "@/redux/hooks"
import { ProgressIndicator, ProgressStep } from "@carbon/react"

import React from "react"

import styles from "../newstyle.module.scss"

const StepperIndicator = () => {
   const count = useAppSelector((state) => state.onBoard.counter)
   return (
      <div className={styles.container}>
         <ProgressIndicator
            currentIndex={count}
            // onChange={changeIndex}
            className={styles.steper}
            data-testId="onboarding-stepper"
            spaceEqually={true}
         >
            <ProgressStep label="Classification" description="Step 1: classification" />
            <ProgressStep label="Configuration" description="Step 2: Configure account" />
         </ProgressIndicator>
      </div>
   )
}

export default StepperIndicator
