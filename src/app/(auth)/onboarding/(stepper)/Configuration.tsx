"use client"

import { reset } from "@/redux/features/onboard.slice"
import { useAppDispatch } from "@/redux/hooks"
import { Button, Column, FileUploaderDropContainer, Grid, Tile } from "@carbon/react"
import { Add, CircleSolid, Close } from "@carbon/react/icons"

import React, { useState } from "react"

import Image from "next/image"

// import styles from "./configuration.module.scss"
import styles from "../onBoarding.module.scss"

function SetupPage() {
   const dispatch = useAppDispatch()
   const [priColor, setPriColor] = useState(false)

   const goToDashboard = () => {
      // window.location.href = "https://dev-admin.lafialink-dev.com/dashboard"
      dispatch(reset())
   }

   return (
      <Grid>
         <Column lg={16} md={8} sm={4}>
            <div>
               <div className="">
                  <h1 className={styles.heading}>Configuration</h1>
                  <p className={styles.subheading}>
                     This is a visual representation of how your interface would appear. You can
                     skip this or edit later.
                  </p>
               </div>


               <div>
                  <Image
                     src="/svg/setup.svg"
                     alt=""
                     width={200}
                     height={180}
                     className={styles.setup_image}
                  />
               </div>
               <div>
                  <FileUploaderDropContainer
                     className={styles.fileupload}
                     labelText="Drag and drop files here or click to upload"
                     multiple={true}
                     accept={["image/jpeg", "image/png"]}
                     disabled={false}
                     name=""
                     data-testId="onboarding-setup-fileuploader"
                  />
               </div>
               <div className={styles.main_org_container}>
                  <Tile>
                     <div className={styles.org_container}>
                        <div>
                           <p className={styles.org_name}>Organization Primary Color</p>
                           <p className={styles.org_color_code}>e.g #0F62FE (Default)</p>
                        </div>
                        <CircleSolid size={50} color="#0F62FE" />
                     </div>
                  </Tile>

                  <Tile>
                     <div className={styles.org_container}>
                        <div>
                           <p className={styles.org_name}>Organization Secondary Color</p>
                           <p className={styles.org_color_code}>e.g #008080 (Default)</p>
                        </div>
                        <CircleSolid size={50} color="#008080" />
                     </div>
                  </Tile>
               </div>

               <div className={styles.addcolor_container} onClick={() => setPriColor(true)}>
                  <div className={priColor ? styles.hide_div : styles.flex_div}>
                     <Add size={30} color="#0F62FE" />
                     <p className={styles.addcolor}>Add Secondary Color</p>
                  </div>
                  <div
                     className={priColor ? styles.flex_div : styles.hide_div}
                     onClick={() => setPriColor(false)}
                  >
                     <Close size={30} color="#DA1E28" />
                     <p className={styles.removecolor}>Remove Secondary Color</p>
                  </div>
               </div>

               <div className={styles.submit_container}>
                  <p className={styles.skip_text}>Skip</p>
                  <Button
                     size="lg"
                     className={styles.button}
                     onClick={goToDashboard}
                     data-testId="onboarding-setup-btn"
                  >
                     Save & Go To Dashboard
                  </Button>
               </div>
            </div>
         </Column>
      </Grid>
   )
}

export default SetupPage
