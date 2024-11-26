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
      <Grid as="main" fullWidth className={styles.container}>
         <Column lg={8} md={6} sm={12} className={styles.center}>
            <div className={styles.children}>
               <Image
                  src="/svg/auth-header.svg"
                  alt=""
                  width={60}
                  height={16}
                  className={styles.authHeaderSvg}
               />
               {children}
            </div>
         </Column>
      </Grid>
   )
}

export default AuthLayout
