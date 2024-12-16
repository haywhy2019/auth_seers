"use client"

import { Checkbox, Tile } from "@carbon/react"

import React, { useState } from "react"

import Image from "next/image"

import styles from "./productTile.module.scss"

type Product = {
   title: string
   details: string
}

type ProductTileProps = {
   onClick: () => void
   product: Product
}

function ProductTile({ onClick, product }: ProductTileProps) {
   const [isChecked, setIsChecked] = useState(false)
   return (
      <Tile className={styles.tile} data-testId="onboarding-product-tile">
         <div className={styles.tile_flex}>
            <Checkbox
               id="checkbox"
               labelText=""
               checked={isChecked}
               onChange={(_, { checked }) => setIsChecked(checked)}
               data-testId="onboarding-product-checkbox"
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
                     {product?.title}
                  </p>
                  <p className={styles.body} data-testId="onboarding-product-body">
                     {product?.details}
                  </p>
               </div>
            </div>
         </div>

         <div onClick={onClick}>
            <p className={styles.features}>View Features</p>
         </div>
      </Tile>
   )
}

export default ProductTile
