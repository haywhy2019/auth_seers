"use client"

import OnBoardingSteper from "@/app/(auth)/onboarding/_components/stepper/onBoardingSteper"

import React, { useState } from "react"

import { initialContext } from "./_components/stepper/stepperContext"

export default function OnboardingLayout({
   children, // will be a page or nested layout
}: {
   children: React.ReactNode
}) {
   const [index, setIndex] = useState<number>(0)
   return (
      <initialContext.Provider value={{ index, setIndex }}>
         <OnBoardingSteper />
         {children}
      </initialContext.Provider>
   )
}
