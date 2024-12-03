"use client"
import React, { useContext, useState } from "react"
import { Button ,Grid, Column, Row} from "@carbon/react"

import styles from './onboarding.module.scss'
import StepperContext from "./_components/stepper/stepperContext"
import ProductTile from "./_components/productTile/productTile"
import ProductModal from "./_components/productModal/productModal"
import ProductList from "./productList/productList"
import SubscriptionPage from "./subscription/page"

const Onboarding = () => {

   const { index, setIndex } = useContext(StepperContext)

   console.log(index, "indexs")



   return (
      <div className={''}>
         {index == 0 && (
            <ProductList />
         )}
         {index == 1 && (
            <SubscriptionPage />
         )}


      </div>
   )
}

export default Onboarding
