import React , {useState} from 'react'
import { Modal } from '@carbon/react';
import Image from "next/image"


function ProductModal({open, setOpen}: any) {
    const listDemo = [
     "Feature text goes here",
      "Feature text goes here",
       "Feature text goes here",
        "Feature text goes here",
         "Feature text goes here",
          "Feature text goes here"
  
    ]
  return (
    <Modal open={open} onRequestClose={() => setOpen(false)}
     modalHeading="OpenMRS" modalLabel="" 
     passiveModal
    >
        <p style={{
        marginBottom: '1rem'
      }}>
         This is used to manage your clinical services such as patient care, screening, treatment, and surveillance amongst many other services.
        </p>
        <p style={{
        fontWeight: 'bold'
       }}> Features List </p>
<div style ={{
  display: 'flex',
  flexWrap: "wrap"
}}>
 {listDemo.map((item, i) => (
  <FeatureList item={item} key={i}/>
 ))}
</div>

       <p style={{
        fontWeight: 'bold',
        paddingTop: '2rem'
       }}>Note that billing for this product ranges from N500 to N50,000 depending on the plan that is best for your organization.</p>
      </Modal>
  )
}

const FeatureList = ({item}: {item: String}) => {
  return (
    <div style={{
      display: "flex",
      alignItems: 'center',
      marginTop: '1rem',
      minWidth: '50%'
    }}>
      <Image
            src="/svg/featureList.svg"
            alt=""
            width={15}
            height={15}
            className={''}
          />
      <p style={{
        fontSize: ".875rem",
        fontWeight: 400,
        
      }}>Feature text goes here</p>
    </div>
  )
}

export default ProductModal
