"use client"

import StepperIndicator from "@/app/(auth)/onboarding/(stepper)/StepperIndicator"

import React from "react"

export default function OnboardingLayout({
   children, // will be a page or nested layout
}: {
   children: React.ReactNode
}) {
   return (
      <div style={{ width: "100%", minWidth: "100%" }}>
         <StepperIndicator />
         {children}
      </div>
   )
}
