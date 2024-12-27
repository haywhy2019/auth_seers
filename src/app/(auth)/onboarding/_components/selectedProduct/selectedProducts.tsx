import { Checkbox, Tile } from "@carbon/react"

import React, { useState } from "react"

import styles from "./products.module.scss"
import { useAppSelector } from "@/redux/hooks"

function SelectedProduct() {
   // const [isChecked, setIsChecked] = useState(false)
   const features = ["LafiaHMS", "LafiaLabs", "LafiaERP"]
   const selectedProduct = useAppSelector((state) => state.productInfo.selectedProduct)

   console.log(selectedProduct, "select prod")
   return (
      <div className={styles.tile_margin}>
         <Tile id="subscription-tile" data-testId="onboarding-select-product-tile">
            <p className={styles.tile_heading}>Selected Products</p>
            <p className={styles.text_body}>
               These are the products you selected in the previous page.
            </p>
            <div className={styles.tile}>
               {selectedProduct.map((item) => (
                  <Features
                     feature={item}
                     key={item}
                     data-testId="onboarding-select-product-feature"
                  />
               ))}
            </div>
         </Tile>
      </div>
   )
}

export default SelectedProduct

const Features = ({ feature }: { feature: string }) => {
   const [isChecked, setIsChecked] = useState(false)

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

         <p className={styles.features}>features</p>
      </div>
   )
}

