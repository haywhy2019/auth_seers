'use client'
import React ,{useState} from 'react'
import { Grid, Column } from '@carbon/react';
import styles from './onboarding.module.scss'
import OnBoardingSteper from '@/app/(auth)/onboarding/_components/stepper/onBoardingSteper';
import StepperContext from './_components/stepper/stepperContext';


export default function OnboardingLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode
  }) {
      const [index, setIndex] = useState(0)
    return (
        <StepperContext.Provider value={{index, setIndex}}>
            <OnBoardingSteper/>
            {children}
        </StepperContext.Provider>
   
    )
  }