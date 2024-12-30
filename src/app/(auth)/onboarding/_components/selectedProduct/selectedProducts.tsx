import { Checkbox } from "@carbon/react"

import React from "react"

import { Products } from "@/types/general.types"

import styles from "./products.module.scss"

type ProductProps = {
   product: Products
   selected: number[]
   onChange: () => void
   amount: string
}

function SelectedProduct({ product, selected, onChange, amount }: ProductProps) {
   console.log(selected, "selected")
   return (
      <div className={styles.feature_container}>
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
         <p className={styles.features}>&#8358;{amount}</p>
      </div>
   )
}

export default SelectedProduct
