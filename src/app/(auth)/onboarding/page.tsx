"use client"

import { useAppSelector } from "@/redux/hooks"

import React from "react"

import PaymentPage from "./(stepper)/payment/payment"
import ProductList from "./(stepper)/products/productList"
import SetupPage from "./(stepper)/setup/setUp"
import SubscriptionPage from "./(stepper)/subscription/subscription"

const Onboarding = () => {
   const count = useAppSelector((state) => state.onBoard.counter)
   return (
      <div className={""}>
         {count == 0 && <ProductList />}
         {count == 1 && <SubscriptionPage />}
         {count == 2 && <PaymentPage />}
         {count == 3 && <SetupPage />}
      </div>
   )
}

export default Onboarding
