import { useAppSelector } from "@/redux/hooks"
import { Checkbox } from "@carbon/react"

import React, { useState } from "react"

import formatAmount from "@/helpers/formatAmount"

import styles from "./products.module.scss"

function SelectedProduct({ feature, amount }: { feature: string; amount: number }) {
   const [isChecked, setIsChecked] = useState(false)
   const selectedProduct = useAppSelector((state) => state.productInfo.selectedProduct)

   console.log(selectedProduct, "select pro")
   const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      data: { checked: boolean },
   ) => {
      setIsChecked(data.checked)
   }

   return (
      <div className={styles.feature_container}>
         <div className={styles.feature_flex}>
            <Checkbox
               id="checkbox"
               labelText=""
               checked={isChecked}
               onChange={handleChange}
               data-testId="onboarding-select-product-checkbox"
            />
            <p className={styles.feature_text}>{feature}</p>
         </div>

         <p className={styles.features}>&#8358;{formatAmount(amount)}</p>
      </div>
   )
}

export default SelectedProduct
