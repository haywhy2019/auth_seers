'use client'
import { Grid, Column } from '@carbon/react';
import styles from './onboarding.module.scss'
import LafiaLogo from '@/assets/svg/lafiaLogo';
import OnBoardingSteper from '@/components/onBoardingSteper';

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
    return (
        <Grid className={styles.container} fullWidth>
            <Column lg={8} md={6} sm={12} >  
            <LafiaLogo />
            <OnBoardingSteper />
            {children}
            </Column>
        </Grid>
   
    )
  }