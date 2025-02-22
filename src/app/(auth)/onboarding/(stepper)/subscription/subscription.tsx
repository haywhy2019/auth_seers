"use client"

import { WarningHex } from "@carbon/icons-react"
import { Column, Grid } from "@carbon/react"

import React from "react"

import SubscriptionTab from "../../_components/subscriptionTab/subscriptionTab"
import styles from "./subscription.module.scss"

function SubscriptionPage() {
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
                  <div className={styles.notice_container}>
                     <WarningHex size={80} color="black" />
                     <div>
                        <p>
                           Credits are required to access all the features of the selected products.
                           These credits can be used within the app for features like registration
                           and more. As a bonus, you will receive 100 free credits with your first
                           purchase.
                        </p>
                     </div>
                  </div>
               </div>

               <SubscriptionTab data-testId="onboarding-subscription-tab-component" />
            </div>
         </Column>
      </Grid>
   )
}

export default SubscriptionPage
