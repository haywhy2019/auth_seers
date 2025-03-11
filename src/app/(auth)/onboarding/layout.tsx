"use client"

import StepperIndicator from "@/app/(auth)/onboarding/(stepper)/stepperIndicator/stepperIndicator"

import React from "react"

export default function OnboardingLayout({
   children, // will be a page or nested layout
}: {
   children: React.ReactNode
}) {
   return (
      <div>
         <StepperIndicator />
         {children}
      </div>
   )
}
