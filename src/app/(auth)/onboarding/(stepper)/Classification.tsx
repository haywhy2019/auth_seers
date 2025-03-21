"use client"

import { increment } from "@/redux/features/onboard.slice"
import { useAppDispatch } from "@/redux/hooks"
import { RadioButton, RadioButtonGroup } from "@carbon/react"

import React from "react"

import { healthCareGrouping } from "@/helpers/constants"

import styles from "../newstyle.module.scss"
import StepperButton from "./StepperButton"

function Classification() {
   const dispatch = useAppDispatch()

   return (
      <div>
         <div>
            <div>
               <h1 className={styles.heading}>What category is healthcare facility? </h1>
               <p className={styles.sub_heading}>Select one with best fit your description.</p>
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
                        key={index}
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
      </div>
   )
}

export default Classification
