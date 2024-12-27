import ErrorComponent from "@/app/components/error/error"
import Loader from "@/app/components/loader/loader"
import { formData, increment } from "@/redux/features/onboard.slice"
import { products, selectedProduct } from "@/redux/features/products.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Renew } from "@carbon/icons-react"
import { ActionableNotification, Button, ToastNotification } from "@carbon/react"
import { useQuery } from "@tanstack/react-query"

import React, { useEffect, useState } from "react"

import productsApi from "@/axios/products.api"

import getProductsByIds from "@/helpers/products"

import { Products } from "@/types/general.types"

import ProductModal from "../../_components/productModal/productModal"
import ProductTile from "../../_components/productTile/productTile"
import styles from "./productList.module.scss"
import SelectProductHook from "./selectProductHook"

function ProductList() {
   const [open, setOpen] = useState(false)
   const { selected, setSelected } = SelectProductHook()
   const [err, setErr] = useState("")
   const dispatch = useAppDispatch()

   const { isPending, error, data } = useQuery({
      queryKey: ["productData"],
      queryFn: productsApi.products,
      retry: 6,
   })

   const handleSubmit = () => {
      if (selected.length == 0) {
         setErr("Please select a product to continue")
         setTimeout(() => setErr(""), 4000)
      } else {
         dispatch(formData({ products: selected }))
         dispatch(increment())
         dispatch(selectedProduct(getProductsByIds(data?.data.data, selected)))
         const selectedProduct1 = getProductsByIds(data?.data.data, selected)
         console.log(selectedProduct1, "test")
      }
   }
   useEffect(() => {
      if (data?.status == 200) {
         dispatch(products(data.data.data))
      } else {
         if (error) {
            setErr("Unable to display products, please reload page")
            setTimeout(() => setErr(""), 4000)
         }
      }

      console.log("called")
   }, [data, error])

   // const products = [
   //    { title: "LafiaHMS", details: "Manage your clinical services. Powered by OpenMRS" },
   //    { title: "LafiaLabs", details: "Manage your lab services. Powered by OpenELIS" },
   //    { title: "LafiaERP", details: "Manage your core processes. Powered by Odoo" },
   // ]

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
               title={err}
               style={{ position: "absolute", top: 40 }}
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
            {error ? (
               <div>
                  <ActionableNotification
                     title="Products Error"
                     subtitle="Please try again"
                     closeOnEscape
                     inline={false}
                     actionButtonLabel="Action"
                     onActionButtonClick={() => console.log("test")}
                  />
               </div>
            ) : (
               data?.data?.data?.map((item: Products, index: number) => (
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
               ))
            )}
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
