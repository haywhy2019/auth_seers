"use client"

import { Checkbox, Column, FlexGrid, Grid, Row, Tile, Tab, TabList, TabPanels, Tabs, TabPanel, Layer, Button, TextInput} from "@carbon/react"

import React, { useState } from "react"

import styles from "./subscription.module.scss"
import SubscriptionTab from "../_components/subscriptionTab"
import SelectedProduct from "../_components/selectedProduct/selectedProducts"

function SubscriptionPage() {
   const [isChecked, setIsChecked] = useState(false)
   const features = ["LafiaHMS", "LafiaLabs", "LafiaERP"]
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

               {/* <div className={styles.tile_margin}>
                  <Tile id="subscription-tile">
                     <p className={styles.tile_heading}>Selected Products</p>
                     <p className={styles.text_body}>
                        These are the products you selected in the previous page.
                     </p>
                     <div className={styles.tile}>
                        {features.map((item) => (
                           <Features feature={item} key={item} />
                        ))}
                     </div>
                  </Tile>
               </div> */}
     
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
                <Button size="xl">
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
