import { useAppSelector } from "@/redux/hooks"
import { Column, Grid, Layer, Tab, TabList, TabPanel, TabPanels, Tabs } from "@carbon/react"

import React, { useState } from "react"

import { Products } from "@/types/general.types"

import SelectedProduct from "../selectedProduct/selectedProducts"
import SelectedProductWithInput from "../selectedProduct/selectedProductwithInput"
import styles from "./subscription.module.scss"

function SubscriptionTab() {
   const [index, setIndex] = useState(0)
   const selectedProduct = useAppSelector((state) => state.productInfo.selectedProduct)
   const [payAsGo, setPayAsGo] = useState<number[]>([])

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
                           {selectedProduct.map((item: Products) => (
                              <SelectedProductWithInput
                                 feature={item.productName}
                                 amount={item.prices.credit}
                                 selected={payAsGo}
                                 setSelected={setPayAsGo}
                                 product={item}
                                 data-testId="onboarding-subscription-selectproduct-component"
                              />
                           ))}
                        </Layer>
                     </TabPanel>
                     <TabPanel style={{ padding: "0" }}>
                        <Layer>
                           {selectedProduct.map((item: Products) => (
                              <SelectedProduct
                                 feature={item.productName}
                                 amount={item.prices.monthly}
                                 data-testId="onboarding-subscription-selectproduct-component"
                              />
                           ))}
                        </Layer>
                     </TabPanel>
                     <TabPanel style={{ padding: "0" }}>
                        {selectedProduct.map((item: Products) => (
                           <SelectedProduct
                              feature={item.productName}
                              amount={item.prices.quarterly}
                              data-testId="onboarding-subscription-selectproduct-component"
                           />
                        ))}
                     </TabPanel>
                     <TabPanel style={{ padding: "0" }}>
                        {selectedProduct.map((item: Products) => (
                           <SelectedProduct
                              feature={item.productName}
                              amount={item.prices.yearly}
                              data-testId="onboarding-subscription-selectproduct-component"
                           />
                        ))}
                     </TabPanel>
                  </TabPanels>
               </div>
            </Tabs>
         </Column>
      </Grid>
   )
}

export default SubscriptionTab
