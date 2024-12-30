import { increment, reset } from "@/redux/features/onboard.slice"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { Button, Column, Grid, Layer, Tab, TabList, TabPanel, TabPanels, Tabs } from "@carbon/react"

import React, { useEffect, useState } from "react"

import formatAmount from "@/helpers/formatAmount"
import { getProductsId } from "@/helpers/products"

import { Products } from "@/types/general.types"

import SelectedProduct from "../selectedProduct/selectedProducts"
import SelectedProductWithInput from "../selectedProduct/selectedProductwithInput"
import handleSelectedProductCheckbox from "./handleCheckBoxChange"
import styles from "./subscription.module.scss"

function SubscriptionTab() {
   const dispatch = useAppDispatch()
   const [index, setIndex] = useState(0)
   const selectedProduct = useAppSelector((state) => state.productInfo.selectedProduct)
   const [selectedPlans, setSelectedPlans] = useState<number[]>([])

   const SubscriptionButton = ({ onClick }: { onClick: () => void }) => {
      return (
         <div>
            <div className={styles.subscription_button}>
               <Button
                  className={styles.sub_btn}
                  size="xl"
                  onClick={onClick}
                  data-testId="onboarding-subscription-btn"
               >
                  Proceed To Payment
               </Button>
            </div>

            <div className={styles.logout_container}>
               <p className={styles.logout_text1}>Something happened? </p>
               <p className={styles.logout_text2}>Logout</p>
            </div>
         </div>
      )
   }

   useEffect(() => {
      setSelectedPlans(getProductsId(selectedProduct))
   }, [])

   return (
      <Grid>
         <Column lg={16} md={8} sm={4}>
            <Tabs
               onChange={({ selectedIndex }) => setIndex(selectedIndex)}
               data-testId="onboarding-subscription"
            >
               <TabList aria-label="List of tabs" contained fullWidth>
                  <Tab
                     className={index == 0 ? styles.select_tab_label : styles.tab_label}
                     style={{ fontSize: "0.7rem" }}
                  >
                     Pay As You Go
                  </Tab>
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
                           {selectedProduct?.map((item: Products) => (
                              <SelectedProductWithInput
                                 key={item.id}
                                 selected={selectedPlans}
                                 product={item}
                                 data-testId="onboarding-subscription-selectproduct-component"
                                 onChange={() =>
                                    handleSelectedProductCheckbox(setSelectedPlans, item.id)
                                 }
                              />
                           ))}
                           <SubscriptionButton
                              onClick={() => {
                                 dispatch(increment())
                                 dispatch(reset())
                              }}
                           />
                        </Layer>
                     </TabPanel>
                     <TabPanel style={{ padding: "0" }}>
                        <Layer>
                           {selectedProduct.map((item: Products) => (
                              <SelectedProduct
                                 amount={formatAmount(item.prices.monthly)}
                                 key={item.id}
                                 selected={selectedPlans}
                                 product={item}
                                 data-testId="onboarding-subscription-selectproduct-component"
                                 onChange={() =>
                                    handleSelectedProductCheckbox(setSelectedPlans, item.id)
                                 }
                              />
                           ))}
                           <SubscriptionButton
                              onClick={() => {
                                 // dispatch(increment())
                                 dispatch(reset())
                              }}
                           />
                        </Layer>
                     </TabPanel>
                     <TabPanel style={{ padding: "0" }}>
                        <Layer>
                           {selectedProduct.map((item: Products) => (
                              <SelectedProduct
                                 amount={formatAmount(item.prices.quarterly)}
                                 key={item.id}
                                 selected={selectedPlans}
                                 product={item}
                                 data-testId="onboarding-subscription-selectproduct-component"
                                 onChange={() =>
                                    handleSelectedProductCheckbox(setSelectedPlans, item.id)
                                 }
                              />
                           ))}
                           <SubscriptionButton
                              onClick={() => {
                                 dispatch(increment())
                                 // dispatch(reset())
                              }}
                           />
                        </Layer>
                     </TabPanel>
                     <TabPanel style={{ padding: "0" }}>
                        <Layer>
                           {selectedProduct.map((item: Products) => (
                              <SelectedProduct
                                 amount={formatAmount(item.prices.yearly)}
                                 key={item.id}
                                 selected={selectedPlans}
                                 product={item}
                                 data-testId="onboarding-subscription-selectproduct-component"
                                 onChange={() =>
                                    handleSelectedProductCheckbox(setSelectedPlans, item.id)
                                 }
                              />
                           ))}
                           <SubscriptionButton
                              onClick={() => {
                                 dispatch(increment())
                                 // dispatch(reset())
                              }}
                           />
                        </Layer>
                     </TabPanel>
                  </TabPanels>
               </div>
            </Tabs>
         </Column>
      </Grid>
   )
}

export default SubscriptionTab
