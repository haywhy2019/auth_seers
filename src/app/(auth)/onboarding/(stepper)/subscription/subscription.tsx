"use client"

import { increment } from "@/redux/features/onboard.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Button, Column, Grid, Tile } from "@carbon/react"

import React from "react"

import SelectedProduct from "../../_components/selectedProduct/selectedProducts"
import SubscriptionTab from "../../_components/subscriptionTab/subscriptionTab"
import styles from "./subscription.module.scss"

function SubscriptionPage() {
   const dispatch = useAppDispatch()

   const selectedProduct = useAppSelector((state) => state.productInfo.selectedProduct)
   return (
      <Grid>
         <Column lg={16} md={8} sm={4}>
            <div>
               <div className="">
                  <h1 className={styles.heading}>Subscription</h1>
                  <p className={styles.subheading}>
                     Review the subscription plans and pick the one you prefer. Note that the cost
                     is affected by the number of product you picked.
                  </p>
               </div>
               <SelectedProduct data-testId="onboarding-subscription-selectproduct-component" />
               <SubscriptionTab data-testId="onboarding-subscription-tab-component" />
            </div>
            <div>
               <Tile id="pricing-tile" className={styles.tile_padding}>
                  <div className={styles.pricing_container}>
                     <div className={styles.pricing}>
                        <span className={styles.currency}>&#8358;</span>
                        <p className={styles.amount}>1,000</p>
                        <p className={styles.currency_text}>.00</p>
                        <p className={styles.currency_text}>/credit</p>
                     </div>
                     <Button
                        size="xl"
                        onClick={() => dispatch(increment())}
                        data-testId="onboarding-subscription-btn"
                     >
                        Select Plan
                     </Button>
                  </div>
               </Tile>
            </div>
         </Column>
      </Grid>
   )
}

export default SubscriptionPage
