import React, { useState } from 'react'
import { Checkbox, Tile} from "@carbon/react"
import styles from "./products.module.scss"

function SelectedProduct() {
   const [isChecked, setIsChecked] = useState(false)
   const features = ["LafiaHMS", "LafiaLabs", "LafiaERP"]
  return (
    <div className={styles.tile_margin}>
    <Tile id="subscription-tile">
       <p className={styles.tile_heading}>Selected Products</p>
       <p className={styles.text_body}>
          These are the products you selected in the previous page.
       </p>
       <div className={styles.tile}>
          {features.map((item) => (
             <Features feature={item} key={item} />
          ))}
       </div>
    </Tile>
 </div>
  )
}

export default SelectedProduct

const Features = ({ feature }: { feature: String }) => {
   const [isChecked, setIsChecked] = useState(false)
   return (
      <div className={styles.feature_container}>
         <div className={styles.feature_flex}>
            <Checkbox
               id="checkbox"
               labelText=""
               checked={isChecked}
               onChange={(_, { checked }: any) => setIsChecked(checked)}
            />
            <p className={styles.feature_text}>LafiaHMS</p>
         </div>

         <p className={styles.features}>Features</p>
      </div>
   )
}

