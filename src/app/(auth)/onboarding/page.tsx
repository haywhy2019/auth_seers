"use client"
import React, { useContext, useState } from "react"
import { Button } from "@carbon/react"

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

         {/* <div>
            <h1 className={styles.onboard_heading}>Select your products</h1>
            <p className={styles.onboard_subheading}>Select one or more products to add to your organization. Check product details to see more info.</p>
         </div>

         <div>

            {products.map(item => (
               <ProductTile product={item} key={item.title} onClick={() => setOpen(true)}/>
            ))}

         </div>
         <div className={styles.button_container}>
         <Button isExpressive className={styles.button}>Next</Button>
         </div>

         <ProductModal open={open} setOpen={setOpen}/> */}

      </div>
   )
}

export default Onboarding
