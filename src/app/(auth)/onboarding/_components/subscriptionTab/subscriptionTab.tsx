import Toast from "@/app/components/Toast"
import { increment } from "@/redux/features/onboard.slice"
import { selectedProduct } from "@/redux/features/products.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import {
   Button,
   Column,
   Grid,
   InlineLoading,
   Layer,
   Tab,
   TabList,
   TabPanel,
   TabPanels,
   Tabs,
} from "@carbon/react"
import { useMutation } from "@tanstack/react-query"

import React, { useEffect, useState } from "react"

import Link from "next/link"

import productsApi from "@/axios/products.api"

import formatAmount from "@/helpers/formatAmount"
import { authRoutes } from "@/helpers/routes"

import { PaymentPlan, Price, Products } from "@/types/product.types"

import SelectedProduct from "../selectedProduct/selectedProducts"
import styles from "./subscription.module.scss"

function SubscriptionTab() {
   const dispatch = useAppDispatch()
   const [index, setIndex] = useState(0)
   const reduxSelectedProduct = useAppSelector((state) => state.productInfo.selectedProduct)
   const [editSelected, setEditSelected] = useState<Products[]>(reduxSelectedProduct)
   const [success, setSuccess] = useState("")

   const {
      mutate: _addProducts,
      isSuccess,
      isError,
      isPending: addProductLoading,
      error: addProductErr,
   } = useMutation({
      mutationFn: productsApi.selectProducts,
      onSuccess: ({ data }) => {
         setSuccess(data?.message)
         setTimeout(() => {
            dispatch(increment())
         }, 4000)
      },
   })

   function getPaymentAmount(item: Price[], paymentPlan: string) {
      const amount = item
         .map(() => {
            const selectedPrice = item.find(
               (price) => price.priceType === paymentPlan.toUpperCase(),
            )
            return selectedPrice ? selectedPrice.amount : null
         })
         .filter((amount) => amount !== null)
      return amount[0].toString()
   }

   const handleSubmit = (paymentPlan: PaymentPlan) => {
      dispatch(selectedProduct(editSelected))
      const payload = editSelected.map((item: Products) => {
         return {
            productId: item.id,
            amount: getPaymentAmount(item.prices, paymentPlan),
            credit: 10,
            rate: 0,
            priceType: paymentPlan.toUpperCase(),
         }
      })

      _addProducts(payload)
   }

   const handleSelectedProductCheckbox = (
      setEditSelected: React.Dispatch<React.SetStateAction<Products[]>>,
      product: Products,
   ) => {
      setEditSelected((prev) =>
         prev.map((item) => item.id).includes(product.id)
            ? prev.filter((checkboxId) => checkboxId.id !== product.id)
            : [...prev, product],
      )
   }

   const SubscriptionButton = ({ onClick, loading }: { onClick: () => void; loading: boolean }) => {
      return (
         <div>
            <div className={styles.subscription_button}>
               <Button
                  className={styles.sub_btn}
                  size="xl"
                  onClick={onClick}
                  data-testId="onboarding-subscription-btn"
               >
                  {loading && <InlineLoading />}
                  Proceed To Payment
               </Button>
            </div>

            <div className={styles.logout_container}>
               <p className={styles.logout_text1}>Something happened? </p>
               <Link className={styles.logout_text2} href={authRoutes.logout}>
                  Logout
               </Link>
            </div>
         </div>
      )
   }

   useEffect(() => {
      setEditSelected(reduxSelectedProduct)
   }, [])

   return (
      <>
         {(isError || isSuccess) && (
            <Toast
               kind={isError ? "error" : "success"}
               title={success || (isError ? addProductErr.message : success)}
            />
         )}
         <Grid>
            <Column lg={16} md={8} sm={4}>
               <Tabs
                  onChange={({ selectedIndex }) => setIndex(selectedIndex)}
                  data-testId="onboarding-subscription"
               >
                  <TabList aria-label="List of tabs" contained fullWidth>
                     <Tab
                        className={index == 1 ? styles.select_tab_label : styles.tab_label}
                        style={{ fontSize: "0.7rem" }}
                     >
                        Monthly
                     </Tab>
                     <Tab
                        className={index == 2 ? styles.select_tab_label : styles.tab_label}
                        style={{ fontSize: "0.7rem" }}
                     >
                        3 Months
                     </Tab>
                     <Tab
                        className={index == 3 ? styles.select_tab_label : styles.tab_label}
                        style={{ fontSize: "0.7rem" }}
                     >
                        Yearly
                     </Tab>
                  </TabList>
                  <div className={styles.panel}>
                     <TabPanels>
                        <TabPanel style={{ padding: "0" }}>
                           <Layer>
                              {reduxSelectedProduct.map((item: Products) => {
                                 return (
                                    <SelectedProduct
                                       amount={formatAmount(item.prices[0].amount)}
                                       key={item.id}
                                       selected={editSelected}
                                       product={item}
                                       data-testId="onboarding-subscription-selectproduct-component"
                                       onChange={() =>
                                          handleSelectedProductCheckbox(setEditSelected, item)
                                       }
                                    />
                                 )
                              })}
                              <SubscriptionButton
                                 onClick={() => handleSubmit("monthly")}
                                 loading={addProductLoading}
                              />
                           </Layer>
                        </TabPanel>
                        <TabPanel style={{ padding: "0" }}>
                           <Layer>
                              {reduxSelectedProduct.map((item: Products) => (
                                 <SelectedProduct
                                    amount={formatAmount(item.prices[1].amount)}
                                    key={item.id}
                                    selected={editSelected}
                                    product={item}
                                    data-testId="onboarding-subscription-selectproduct-component"
                                    onChange={() =>
                                       handleSelectedProductCheckbox(setEditSelected, item)
                                    }
                                 />
                              ))}
                              <SubscriptionButton
                                 onClick={() => handleSubmit("quarterly")}
                                 loading={addProductLoading}
                              />
                           </Layer>
                        </TabPanel>
                        <TabPanel style={{ padding: "0" }}>
                           <Layer>
                              {reduxSelectedProduct.map((item: Products) => (
                                 <SelectedProduct
                                    amount={formatAmount(item.prices[2].amount)}
                                    key={item.id}
                                    selected={editSelected}
                                    product={item}
                                    data-testId="onboarding-subscription-selectproduct-component"
                                    onChange={() =>
                                       handleSelectedProductCheckbox(setEditSelected, item)
                                    }
                                 />
                              ))}
                              <SubscriptionButton
                                 onClick={() => handleSubmit("yearly")}
                                 loading={addProductLoading}
                              />
                           </Layer>
                        </TabPanel>
                     </TabPanels>
                  </div>
               </Tabs>
            </Column>
         </Grid>
      </>
   )
}

export default SubscriptionTab
