"use client"

import { Checkbox, Tile } from "@carbon/react"

import React from "react"

import Image from "next/image"

import { Products } from "@/types/general.types"

import ProductModal from "../productModal/productModal"
import styles from "./productTile.module.scss"

type ProductTileProps = {
   onClick: () => void
   product: Products
   selected: number[]
   setSelected: React.Dispatch<React.SetStateAction<number[]>>
   openModal: boolean
   setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

function ProductTile({
   onClick,
   product,
   selected,
   setSelected,
   openModal,
   setOpenModal,
}: ProductTileProps) {
   const handleCheckboxChange = (productId: number) => {
      setSelected((prev) =>
         prev.includes(productId)
            ? prev.filter((checkboxId) => checkboxId !== productId)
            : [...prev, productId],
      )
   }

   return (
      <Tile className={styles.tile} data-testId="onboarding-product-tile">
         <div className={styles.tile_flex}>
            <Checkbox
               id={product?.id.toString()}
               labelText=""
               checked={selected.includes(product?.id)}
               onChange={() => handleCheckboxChange(product?.id)}
               data-testId="onboarding-product-checkbox"
               value={product.id}
            />

            <div className={styles.tile_flex}>
               <Image
                  src="/svg/productLogo.svg"
                  alt=""
                  width={35}
                  height={35}
                  className={styles.product_logo}
                  data-testId="onboarding-product-logo"
               />
               <div>
                  <p className={styles.heading} data-testId="onboarding-product-title">
                     {product?.productName}
                  </p>
                  <p className={styles.body} data-testId="onboarding-product-body">
                     {product?.description}
                  </p>
               </div>
            </div>
         </div>

         <div onClick={onClick}>
            <p className={styles.features}>View Features</p>
         </div>

         <ProductModal
            open={openModal}
            setOpen={setOpenModal}
            data-testId="onboarding-products-modal"
            features={product.features}
         />
      </Tile>
   )
}

export default ProductTile
