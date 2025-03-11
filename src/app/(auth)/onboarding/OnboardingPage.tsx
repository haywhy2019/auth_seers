"use client"

import { useAppSelector } from "@/redux/hooks"

import React from "react"

import ClassificationPage from "./(stepper)/Classification"
import ConfigurationPage from "./(stepper)/Configuration"

const OnboardingPage = () => {
   const count = useAppSelector((state) => state.onBoard.counter)
   return (
      <div>
         {count == 0 && <ClassificationPage />}
         {count == 1 && <ConfigurationPage />}
      </div>
   )
}

export default OnboardingPage
