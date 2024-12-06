"use client"

import { increment } from "@/redux/features/onboard.slice"
import { useAppDispatch } from "@/redux/hooks"
import { Button, Column, Grid, RadioButton, TextInput, Tile } from "@carbon/react"
import { ChevronLeft, ChevronRight } from "@carbon/react/icons"

import React from "react"

import PaystackLogo from "../../../../../../public/svg/paystack"
import SelectedProduct from "../../_components/selectedProduct/selectedProducts"
import styles from "./payment.module.scss"

function PaymentPage() {
   const dispatch = useAppDispatch()

   const options = [
      { label: "Pay As You Go", amount: "N1,000/credit" },
      { label: "Monthly", amount: "N10,000/monthly" },
      { label: "3 Months", amount: "N25,000/3 months" },
      { label: "Yearly", amount: "N85,000/yearly" },
   ]

   // data-testId="unique-name"
   return (
      <Grid>
         <Column lg={16} md={8} sm={4}>
            <div>
               <div className="">
                  <h1 className={styles.heading}>Payment</h1>
                  <p className={styles.subheading}>
                     Review the product and subscription plan you selected, then proceed to make
                     payment. Note that you can still change the product and the plan.
                  </p>
               </div>

               <SelectedProduct />
            </div>
            <div>
               <Tile id="pricing-tile" className={styles.tile_padding}>
                  {options.map((item, i) => (
                     <Pricing label={item.label} amount={item.amount} key={i} idx={i} />
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
               <Tile id="pricing-tile" className={styles.tile_padding}>
                  <div className={styles.pricing_container}>
                     <div className={styles.pricing_amount}>
                        <span className={styles.currency}>&#8358;</span>
                        <p className={styles.payment_amount}>1,000</p>
                        <p className={styles.currency_text}>.00</p>
                        <p className={styles.currency_text}>/credit</p>
                     </div>
                     <Button
                        size="xl"
                        className={styles.button}
                        onClick={() => dispatch(increment())}
                     >
                        Pay
                        <div className={styles.logo}>
                           <PaystackLogo />
                        </div>
                     </Button>
                  </div>
               </Tile>
            </div>
         </Column>
      </Grid>
   )
}

export default PaymentPage

const Pricing = ({ label, amount, idx }: { label: string; amount: string; idx: number }) => {
   return (
      <div className={styles.pricing}>
         <RadioButton labelText={label} value={idx.toString()} id={idx.toString()} />
         <p className={idx == 0 ? styles.amount : styles.amount_disabled}>{amount}</p>
      </div>
   )
}
