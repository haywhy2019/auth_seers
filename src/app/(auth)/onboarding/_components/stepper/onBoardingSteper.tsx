'use client'
import React, { useState, useContext } from 'react'

import styles from "./stepper.module.scss"
import { ProgressIndicator, ProgressStep, Grid, Column, Row } from '@carbon/react';
import StepperContext from './stepperContext';


const OnBoardingSteper = () => {
    const { index, setIndex } = useContext(StepperContext)

    const changeIndex = () => {
        if (index < 4) {
            setIndex(index + 1)
        }
    }
    return (
        <ProgressIndicator currentIndex={index} 
        // onChange={changeIndex} 
        className={styles.steper}>
                <ProgressStep label="Products" description="Step 1: select product"  />
                <ProgressStep label="Subscription" description="Step 2: Select subscription" />
                <ProgressStep label="Payment" description="Step 3: Make payment" />
                <ProgressStep label="Configuration" description="Step 4: Configure account" />
            </ProgressIndicator>
     

    )

}

export default OnBoardingSteper