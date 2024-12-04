"use client"

import { Button, Column, Grid, Tile } from "@carbon/react"

import React, { useContext} from "react"

import SelectedProduct from "../_components/selectedProduct/selectedProducts"
import StepperContext from "../_components/stepper/stepperContext"
import SubscriptionTab from "../_components/subscriptionTab"
import styles from "./subscription.module.scss"

function SubscriptionPage() {
   // const [isChecked, setIsChecked] = useState(false)

   const { setIndex } = StepperContext()
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

               <SelectedProduct />
               <p>in progress</p>
               <SubscriptionTab />
               <p>in progress</p>
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
                     <Button size="xl" onClick={() => setIndex(2)}>
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
