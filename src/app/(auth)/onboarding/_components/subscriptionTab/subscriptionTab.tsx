import { Column, Grid, Layer, Tab, TabList, TabPanel, TabPanels, Tabs } from "@carbon/react"

import React, { useState } from "react"

import Image from "next/image"

import styles from "./subscription.module.scss"

function SubscriptionTab() {
   const [index, setIndex] = useState(0)
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
                     <TabPanel>
                        <Layer>
                           <Image
                              src="/svg/currencyCircled.svg"
                              alt=""
                              width={28}
                              height={28}
                              className={styles.auth_logo}
                           />
                           <p className={styles.tab_header}>Pay As You Go</p>
                           <p className={styles.tab_body}>
                              You buy credits which can be used to access all features of the
                              products you selected. This credits will be used in app for features
                              such as registration etc. You also get 100 credits for free on your
                              first buy.
                           </p>
                        </Layer>
                     </TabPanel>
                     <TabPanel>Tab Panel 2</TabPanel>
                     <TabPanel>Tab Panel 3</TabPanel>
                     <TabPanel>Tab Panel 4</TabPanel>
                  </TabPanels>
               </div>
            </Tabs>
         </Column>
      </Grid>
   )
}

export default SubscriptionTab
