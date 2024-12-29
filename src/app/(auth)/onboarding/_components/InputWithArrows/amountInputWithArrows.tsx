import { ChevronLeft, ChevronRight } from "@carbon/icons-react"
import { TextInput } from "@carbon/react"

import React from "react"

import formatAmount from "@/helpers/formatAmount"

import styles from "./amountInput.module.scss"

function AmountInputWithArrows({
   value,
   onChange,
   invalid,
   amount,
   setValue,
}: {
   value: number
   onChange: any
   invalid: boolean
   amount: number
   setValue: any
}) {
   return (
      <div>
         {" "}
         <div className={styles.input_container}>
            <div className={styles.icon_container} onClick={() => setValue((value -= 1))}>
               <ChevronLeft size={20} />
            </div>

            <div className={styles.input}>
               <p className={styles.input_label}>Enter Quantity</p>
               <TextInput
                  id="text-input-1"
                  type="number"
                  labelText=""
                  size="md"
                  data-testId="onboarding-payment-input"
                  value={value}
                  onChange={onChange}
                  //   onBlur={onBlur}
                  invalid={invalid}
               />
            </div>
            <div className={styles.icon_container} onClick={() => setValue((value += 1))}>
               <ChevronRight size={20} />
            </div>
         </div>
         <div className={styles.amount_container}>
            <p className={styles.amount_text}>Cost</p>
            <p className={styles.amount_text_bold}>&#8358; {formatAmount(amount * value)}</p>
         </div>
      </div>
   )
}

export default AmountInputWithArrows
