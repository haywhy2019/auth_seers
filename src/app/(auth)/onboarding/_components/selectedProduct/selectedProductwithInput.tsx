import { Checkbox } from "@carbon/react"

import React, { useState } from "react"

import { Products } from "@/types/general.types"

import AmountInputWithArrows from "../InputWithArrows/amountInputWithArrows"
import styles from "./products.module.scss"

type ProductProps = {
   product: Products
   selected: number[]

   onChange: () => void
}

function SelectedProductWithInput({ product, selected, onChange }: ProductProps) {
   const [creditNum, setCreditNum] = useState(0)

   return (
      <div className={styles.feature_bg}>
         <div className={styles.feature_container_withInput}>
            <div className={styles.feature_flex}>
               <Checkbox
                  id={product?.id.toString()}
                  labelText=""
                  value={product.id}
                  checked={selected.includes(product?.id)}
                  onChange={onChange}
                  data-testId="onboarding-select-product-checkbox"
               />
               <p className={styles.feature_text}>{product.productName}</p>
            </div>
            <p className={styles.features}>{product.prices.credit}/credit</p>
         </div>
         <AmountInputWithArrows
            amount={product.prices.credit}
            value={creditNum}
            setValue={setCreditNum}
            onChange={(e: any) => setCreditNum(e.target.value)}
            invalid={false}
         />
      </div>
   )
}

export default SelectedProductWithInput
