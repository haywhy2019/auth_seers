"use client"

import React, { useContext } from "react"

import StepperContext from "./_components/stepper/stepperContext"
import PaymentPage from "./payment/page"
import ProductList from "./products/productList"
import SubscriptionPage from "./subscription/page"

const Onboarding = () => {
   const { index } = StepperContext()

   return (
      <div className={""}>
         {index == 0 && <ProductList />}
         {index == 1 && <SubscriptionPage />}
         {index == 2 && <PaymentPage />}
      </div>
   )
}

export default Onboarding
