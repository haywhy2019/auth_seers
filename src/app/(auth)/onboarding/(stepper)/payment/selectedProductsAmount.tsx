import { Checkbox, Tile } from "@carbon/react"

import React, { useState } from "react"

import styles from "./payment.module.scss"
import { useAppSelector } from "@/redux/hooks"
import { Products } from "@/types/general.types"
import formatAmount from "@/helpers/formatAmount"

function SelectedProductAmount({ feature,amount }: { feature: string;amount: number }) {
   const [isChecked, setIsChecked] = useState(false)
   const features = ["LafiaHMS", "LafiaLabs", "LafiaERP"]
   const selectedProduct = useAppSelector((state) => state.productInfo.selectedProduct)

   console.log(selectedProduct, "select pro")
   const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      data: { checked: boolean },
   ) => {
      setIsChecked(data.checked)
   }

   return (
      <div className={styles.feature_container} >
      <div className={styles.feature_flex}>
         <p className={styles.feature}>{feature}</p>
         <p className={styles.features}>&#8358;{formatAmount(amount) }</p>
      </div>

<div className={styles.feature_flex}>
<p className={styles.feature_text}>{feature}</p>
<p className={styles.features_text}>&#8358;{formatAmount(amount) }</p>
</div>
   </div>
   )
}

export default SelectedProductAmount


