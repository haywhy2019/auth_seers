import React from "react"

import formatAmount from "@/helpers/formatAmount"

import styles from "./payment.module.scss"

function SelectedProductAmount({ feature, amount }: { feature: string; amount: number }) {
   return (
      <div className={styles.feature_container}>
         <div className={styles.feature_flex}>
            <p className={styles.feature}>{feature}</p>
            <p className={styles.features}>&#8358;{formatAmount(amount)}</p>
         </div>

         <div className={styles.feature_flex}>
            <p className={styles.feature_text}>{feature}</p>
            <p className={styles.features_text}>&#8358;{formatAmount(amount)}</p>
         </div>
      </div>
   )
}

export default SelectedProductAmount
