"use client";

import { increment } from "@/redux/features/onboard.slice";
import { useAppDispatch } from "@/redux/hooks";
import { WarningHex } from "@carbon/icons-react";
import { Column, Grid, RadioButton, RadioButtonGroup } from "@carbon/react";



import React from "react";



import StepperButton from "../stepperButton/StepperButton";
import styles from "./classification.module.scss";
import { healthCareGrouping } from "@/helpers/constants";



function SubscriptionPage() {
   const dispatch = useAppDispatch()
   return (
      <Grid>
         <Column lg={16} md={8} sm={4}>
            <div>
               <div className="">
                  <h1 className={styles.heading}>What category is healthcare facility? </h1>
                  <p className={styles.subheading}>Select one with best fit your description.</p>
               </div>

               <div className={styles.radioContainer}>
                  <RadioButtonGroup
                     legendText=""
                     name="radio-button-vertical-group"
                     defaultSelected="radio-1"
                     orientation="vertical"
                  >
                     {healthCareGrouping.map((item, index) => (
                        <RadioButton
                        labelText={item.title}
                        value={item.value}
                           id={index.toString()}
                         className={styles.radio_btn}
                     />
                     ))}
                     
                  </RadioButtonGroup>
               </div>
               <StepperButton
                  buttonText={"Next"}
                  loading={false}
                  onClick={() => dispatch(increment())}
               />
            </div>
         </Column>
      </Grid>
   )
}

export default SubscriptionPage