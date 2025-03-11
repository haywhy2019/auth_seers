import React from 'react';



import { Metadata } from "next";



import OnboardingPage from "./OnboardingPage"


export const metadata: Metadata = {
   title: "LafiaEMR - Onboarding",
   description: "",
}

function page() {
   return (
     <div>
           <OnboardingPage />
     </div>
  
  )
}

export default page