import React, {useState, useContext} from 'react'
import ProductTile from '../_components/productTile/productTile';
import ProductModal from '../_components/productModal/productModal';
import { Button } from '@carbon/react';
import styles from "./productList.module.scss"
import StepperContext from '../_components/stepper/stepperContext';

function productList() {
    const [open, setOpen] = useState(false);
    const { index, setIndex } = useContext(StepperContext)

    const products = [{ title: "LafiaHMS", details: "Manage your clinical services. Powered by OpenMRS" },
    { title: "LafiaLabs", details: "Manage your lab services. Powered by OpenELIS" },
    { title: "LafiaERP", details: "Manage your core processes. Powered by Odoo" }
 
    ]
 
    return (
       <div className={''}>
          <div>
             <h1 className={styles.onboard_heading}>Select your products</h1>
             <p className={styles.onboard_subheading}>Select one or more products to add to your organization. Check product details to see more info.</p>
          </div>
 
          <div>
 
             {products.map(item => (
                <ProductTile product={item} key={item.title} onClick={() => setOpen(true)}/>
             ))}
 
          </div>
          <div className={styles.button_container}>
          <Button isExpressive className={styles.button} onClick={() => setIndex(1)}>Next</Button>
          </div>
 
          <ProductModal open={open} setOpen={setOpen}/>
       </div>
    )
}

export default productList