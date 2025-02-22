"use client"

import { decrement, increment } from "@/redux/features/onboard.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Button, Column, Grid, Tile } from "@carbon/react"

import React from "react"

import formatAmount from "@/helpers/formatAmount"

import { Products } from "@/types/product.types"

import PaystackLogo from "../../../../../../public/svg/paystack"
import styles from "./payment.module.scss"
import SelectedProductAmount from "./selectedProductsAmount"

function PaymentPage() {
   const dispatch = useAppDispatch()

   const selectedProduct = useAppSelector((state) => state.productInfo.selectedProduct)

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

               {selectedProduct.map((item: Products) => (
                  <SelectedProductAmount
                     feature={item.productName}
                     amount={item.prices[0].amount}
                     key={item.id}
                  />
               ))}
            </div>

            <Tile id="pricing-tile" className={styles.tile_padding}>
               <div className={styles.total_container}>
                  <div className={styles.total_border}>
                     <div className={styles.feature_flex}>
                        <p className={styles.feature_total}>Total</p>
                        <p className={styles.feature_total_text}>&#8358;{formatAmount(10000)}</p>
                     </div>
                  </div>
               </div>
            </Tile>
            <div className={styles.back} onClick={() => dispatch(decrement())}>
               <p className={styles.back_text}>Go Back To Change</p>
            </div>
            <div>
               <Tile id="pricing-tile" className={styles.tile_padding}>
                  <div className={styles.pricing_container}>
                     <div className={styles.pricing_amount}>
                        <span className={styles.currency}>&#8358;</span>
                        <p
                           className={styles.payment_amount}
                           data-testId="onboarding-payment-amount"
                        >
                           1,000
                        </p>
                        <p
                           className={styles.currency_text}
                           data-testId="onboarding-payment-amount2"
                        >
                           .00
                        </p>
                        <p
                           className={styles.currency_text}
                           data-testId="onboarding-payment-amount3"
                        >
                           /credit
                        </p>
                     </div>
                     <Button
                        size="xl"
                        className={styles.button}
                        onClick={() => dispatch(increment())}
                        data-testId="onboarding-payment-btn"
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
