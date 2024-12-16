import { increment } from "@/redux/features/onboard.slice"
import { useAppDispatch } from "@/redux/hooks"
import { Button } from "@carbon/react"

import React, { useState } from "react"

import ProductModal from "../../_components/productModal/productModal"
import ProductTile from "../../_components/productTile/productTile"
import styles from "./productList.module.scss"

function ProductList() {
   const [open, setOpen] = useState(false)
   const dispatch = useAppDispatch()

   const products = [
      { title: "LafiaHMS", details: "Manage your clinical services. Powered by OpenMRS" },
      { title: "LafiaLabs", details: "Manage your lab services. Powered by OpenELIS" },
      { title: "LafiaERP", details: "Manage your core processes. Powered by Odoo" },
   ]

   return (
      <div className={""}>
         <div>
            <h1 className={styles.onboard_heading}>Select your products</h1>
            <p className={styles.onboard_subheading}>
               Select one or more products to add to your organization. Check product details to see
               more info.
            </p>
         </div>

         <div>
            {products.map((item) => (
               <ProductTile
                  product={item}
                  key={item.title}
                  onClick={() => setOpen(true)}
                  data-testId="onboarding-product-product-component"
               />
            ))}
         </div>
         <div className={styles.button_container}>
            <Button
               isExpressive
               className={styles.button}
               onClick={() => dispatch(increment())}
               data-testId="onboarding-products-btn"
            >
               Next
            </Button>
         </div>

         <ProductModal open={open} setOpen={setOpen} data-testId="onboarding-products-modal" />
      </div>
   )
}

export default ProductList
