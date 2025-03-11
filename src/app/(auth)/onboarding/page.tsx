"use client"

import { useAppSelector } from "@/redux/hooks"

import React from "react"

import ConfigurationPage from "./(stepper)/configuration/Configuration"
import ClassificationPage from "./(stepper)/classification/Classification"
import { Button } from "@carbon/react"

const Onboarding = () => {
   const count = useAppSelector((state) => state.onBoard.counter)
   return (
      <div className={""}>
         {count == 0 && <ClassificationPage />}
         {count == 1 && <ConfigurationPage />}
      </div>
   )
}

export default Onboarding
