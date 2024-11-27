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
         <Column lg={{ span: 6, offset: 5 }} md={8} sm={4}>
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
   )
}

export default AuthLayout
