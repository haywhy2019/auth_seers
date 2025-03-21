"use client"

import React from "react"

import StepperIndicator from "./(stepper)/StepperIndicator34"

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
