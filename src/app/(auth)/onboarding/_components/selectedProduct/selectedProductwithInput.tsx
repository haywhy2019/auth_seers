import { useAppSelector } from "@/redux/hooks"
import { Checkbox } from "@carbon/react"

import React, { useState } from "react"

import { Products } from "@/types/general.types"

import AmountInputWithArrows from "../InputWithArrows/amountInputWithArrows"
import styles from "./products.module.scss"

type ProductProps = {
   product: Products
   selected: number[]
   setSelected: React.Dispatch<React.SetStateAction<number[]>>
   feature: string
   amount: number
}

function SelectedProductWithInput({
   feature,
   amount,
   product,
   setSelected,
   selected,
}: ProductProps) {
   //    const [isChecked, setIsChecked] = useState(false)
   const [creditNum, setCreditNum] = useState(0)
   const selectedProduct = useAppSelector((state) => state.productInfo.selectedProduct)

   console.log(selectedProduct, "select pro")
   const handleCheckboxChange = (productId: number) => {
      setSelected((prev) =>
         prev.includes(productId)
            ? prev.filter((checkboxId) => checkboxId !== productId)
            : [...prev, productId],
      )
   }

   return (
      <div className={styles.feature_bg}>
         <div className={styles.feature_container_withInput}>
            <div className={styles.feature_flex}>
               <Checkbox
                  id={product?.id.toString()}
                  labelText=""
                  value={product.id}
                  checked={selected.includes(product?.id)}
                  onChange={() => handleCheckboxChange}
                  data-testId="onboarding-select-product-checkbox"
               />
               <p className={styles.feature_text}>{feature}</p>
            </div>

            <p className={styles.features}>{amount}/credit</p>
         </div>
         <AmountInputWithArrows
            amount={amount}
            value={creditNum}
            setValue={setCreditNum}
            onChange={(e: any) => setCreditNum(e.target.value)}
            invalid={false}
         />
      </div>
   )
}

export default SelectedProductWithInput
