"use client"

import { Button, Column, Grid, RadioButton, TextInput, Tile } from "@carbon/react"
import { ChevronLeft, ChevronRight } from "@carbon/react/icons"

import React, { useState } from "react"

import PaystackLogo from "../../../../../public/svg/paystack"
import SelectedProduct from "../_components/selectedProduct/selectedProducts"
import styles from "./payment.module.scss"

function PaymentPage() {
   // const [selectedIdx, setSelectedIdx] = useState(0)
   const options = [
      { label: "Pay As You Go", amount: "N1,000/credit" },
      { label: "Monthly", amount: "N10,000/monthly" },
      { label: "3 Months", amount: "N25,000/3 months" },
      { label: "Yearly", amount: "N85,000/yearly" },
   ]
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
            </div>
            <div>
               <Tile id="pricing-tile" className={styles.tile_padding}>
                  {options.map((item, i) => (
                     <Pricing
                        label={item.label}
                        amount={item.amount}
                        disabled={false}
                        key={i}
                        idx={i}
                     />
                  ))}
               </Tile>
            </div>

            <div className={styles.input_container}>
               <div className={styles.icon_container}>
                  <ChevronLeft size={20} />
               </div>

               <div className={styles.input}>
                  <p className={styles.input_label}>Enter Quantity</p>
                  <TextInput id="text-input-1" type="number" labelText="" size="md" />
               </div>
               <div className={styles.icon_container}>
                  <ChevronRight size={20} />
               </div>
            </div>

            <div>
               <Tile>
                  <Button size="lg">
                     Pay
                     <div className={styles.logo}>
                        <PaystackLogo />
                     </div>
                  </Button>
               </Tile>
            </div>
         </Column>
      </Grid>
   )
}

export default PaymentPage

const Pricing = ({
   label,
   amount,
   disabled,
   idx,
}: {
   label: string
   amount: string
   disabled: boolean
   idx: number
}) => {
   return (
      <div className={styles.pricing}>
         <RadioButton labelText={label} value={idx.toString()} id={idx.toString()} />
         <p className={idx == 0 ? styles.amount : styles.amount_disabled}>{amount}</p>
      </div>
   )
}
