"use client"

import React from "react"

import StepperContext from "./_components/stepper/stepperContext"
import PaymentPage from "./payment/page"
import ProductList from "./products/productList"
import SetupPage from "./setup/page"
import SubscriptionPage from "./subscription/page"

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
