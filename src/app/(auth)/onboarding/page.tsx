"use client"

import React, { useContext } from "react"

import PaymentPage from "./payment/page"
import ProductList from "./products/productList"
import SubscriptionPage from "./subscription/page"
import StepperContext from "./_components/stepper/stepperContext"


const Onboarding = () => {
   const { index, setIndex } = StepperContext()

  

   return (
      <div className={""}>
         {index == 0 && <ProductList />}
         {index == 1 && <SubscriptionPage />}
         {index == 2 && <PaymentPage />}
      </div>
   )
}

export default Onboarding
