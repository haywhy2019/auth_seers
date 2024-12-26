"use client"

import { Column, Grid } from "@carbon/react"

import Image from "next/image"

import styles from "./auth.module.scss"

const AuthLayout = ({
   children,
}: Readonly<{
   children: React.ReactNode
}>) => {
   return (
      <div
         style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
         }}
      >
         <Grid as="main" fullWidth className={styles.container}>
            <Column xlg={{ span: 6, offset: 5 }} lg={{ span: 8, offset: 4 }} md={8} sm={4}>
               <div className={styles.children}>
                  <Image
                     src="/svg/logo.svg"
                     alt=""
                     width={109}
                     height={24}
                     className={styles.auth_logo}
                  />
                  {children}
               </div>
            </Column>
         </Grid>
      </div>
   )
}

export default AuthLayout
