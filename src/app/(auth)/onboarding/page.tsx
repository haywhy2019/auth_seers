"use client"

import React from "react"

import PaymentPage from "./(stepper)/payment/payment"
import ProductList from "./(stepper)/products/productList"
import SetupPage from "./(stepper)/setup/setUp"
import SubscriptionPage from "./(stepper)/subscription/subscription"
import StepperContext from "./_components/stepper/stepperContext"

const Onboarding = () => {
   const { index } = StepperContext()

   return (
      <div className={""}>
         {index == 0 && <ProductList />}
         {index == 1 && <SubscriptionPage />}
         {index == 2 && <PaymentPage />}
         {index == 3 && <SetupPage />}
      </div>
   )
}

export default Onboarding
