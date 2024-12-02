"use client"
import React, { useState } from 'react'
import styles from "./subscription.module.scss"
import { Tile, Checkbox } from '@carbon/react'


function SubscriptionPage() {
    const [isChecked, setIsChecked] = useState(false);
    const features = ['LafiaHMS', "LafiaLabs", "LafiaERP"]
    return (
        <div>

            <div>
                <h1 className={styles.onboard_heading}>Subscription</h1>
                <p className={styles.onboard_subheading}>Review the subscription plans and pick the one you prefer. Note that the cost is affected by the number of product you picked.</p>
            </div>

            <div>
                <Tile id="subscription-tile">

                    <p>Selected Products</p>
                    <p>These are the products you selected in the previous page.</p>
                    <div className={styles.flex_display}>
                        {features.map(item => (
                            <Features feature={item} key={item} />
                        ))}

                    </div>

                </Tile>
            </div>



        </div>
    )
}

export default SubscriptionPage



const Features = ({ feature }: { feature: String }) => {
    const [isChecked, setIsChecked] = useState(false);
    return (
        <div className={styles.flex_display}>
            <div className={styles.flex_display}>
                <Checkbox
                    id="checkbox"
                    labelText=""
                    checked={isChecked}
                    onChange={(_, { checked }: any) => setIsChecked(checked)}
                />
                 <p className={styles.body}>LafiaHMS</p>
            </div>

           
            <p className={styles.features}>Features</p>
        </div>
    )

}