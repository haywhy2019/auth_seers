"use client"

import OnBoardingSteper from "@/app/(auth)/onboarding/_components/stepper/onBoardingSteper"

import React from "react"

export default function OnboardingLayout({
   children, // will be a page or nested layout
}: {
   children: React.ReactNode
}) {
   return (
      <div>
         <OnBoardingSteper />
         {children}
      </div>
   )
}
