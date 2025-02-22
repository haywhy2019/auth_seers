import Loader from "@/app/components/loader/loader"
import { formData, increment } from "@/redux/features/onboard.slice"
import { products, selectedProduct } from "@/redux/features/products.slice"
import { useAppDispatch } from "@/redux/hooks"
import { Button, ToastNotification } from "@carbon/react"
import { useQuery } from "@tanstack/react-query"

import React, { useEffect, useState } from "react"

import productsApi from "@/axios/products.api"

import { Products } from "@/types/product.types"

import ProductTile from "../../_components/productTile/productTile"
import styles from "./productList.module.scss"

function ProductList() {
   const [open, setOpen] = useState(false)
   const [selected, setSelected] = useState<Products[]>([])
   const [err, setErr] = useState("")
   const dispatch = useAppDispatch()

   const { isPending, error, data } = useQuery({
      queryKey: ["productData"],
      queryFn: productsApi.products,
   })

   const handleSubmit = () => {
      if (selected.length == 0) {
         setErr("Please select a product to continue")
         setTimeout(() => setErr(""), 4000)
      } else {
         dispatch(formData({ products: selected }))
         dispatch(increment())
         dispatch(selectedProduct(selected))
      }
   }
   useEffect(() => {
      if (data?.status == 200) {
         dispatch(products(data.data.data))
      }
   }, [data])

   if (isPending) {
      return <Loader />
   }

   return (
      <div className={""}>
         {err && (
            <ToastNotification
               kind={"error"}
               role="status"
               timeout={3000}
               title={err || "An error occured"}
               style={{ position: "absolute", top: 40 }}
            />
         )}

         {error && (
            <ToastNotification
               title="Products Error"
               subtitle="Please try again"
               className={styles.errorToast}
            />
         )}
         <div>
            <h1 className={styles.onboard_heading}>Select your products</h1>
            <p className={styles.onboard_subheading}>
               Select one or more products to add to your organization. Check product details to see
               more info.
            </p>
         </div>

         <div>
            {/* {productsData?.map((item: Products, index: number) => ( */}
            {data?.data?.data?.map((item: Products, index: number) => (
               <ProductTile
                  product={item}
                  key={index}
                  onClick={() => setOpen(true)}
                  selected={selected}
                  setSelected={setSelected}
                  data-testId="onboarding-product-product-component"
                  openModal={open}
                  setOpenModal={setOpen}
               />
            ))}
         </div>
         <div className={styles.button_container}>
            <Button
               isExpressive
               className={styles.button}
               onClick={handleSubmit}
               data-testId="onboarding-products-btn"
            >
               Next
            </Button>
         </div>
      </div>
   )
}

export default ProductList
