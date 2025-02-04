import React from "react"

import Image from "next/image"

import styles from "../auth.module.scss"

type Props = {
   password: string
}

const PasswordCriteria: React.FC<Props> = ({ password }) => {
   const [validation, setValidation] = React.useState({
      minLength: false,
      maxLength: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
   })

   const constraints = [
      { label: "At least 12 Characters", valid: validation.minLength },
      { label: "At most 64 Characters", valid: validation.maxLength },
      { label: "At least 1 Uppercase Letter", valid: validation.uppercase },
      { label: "At least 1 Lowercase Letter", valid: validation.lowercase },
      { label: "At least 1 Number", valid: validation.number },
      { label: "At least 1 Special Character", valid: validation.specialChar },
   ]

   React.useEffect(() => {
      setValidation({
         minLength: password.length >= 12,
         maxLength: password.length > 0 && password.length <= 64,
         uppercase: /[A-Z]/.test(password),
         lowercase: /[a-z]/.test(password),
         number: /[0-9]/.test(password),
         specialChar: /\W/.test(password),
      })
   }, [password])

   // Check if all constraints are met
   const allChecksPassed = Object.values(validation).every(Boolean)

   // Render only if password length > 1 and not all checks are true
   if (password.length <= 1 || allChecksPassed) return null

   return (
      <div className={styles.password_criteria}>
         {constraints.map((constraint) => (
            <div key={constraint.label} className={styles.password_criteria_item}>
               <Image
                  src={constraint.valid ? "/svg/green-check.svg" : "/svg/empty-check.svg"}
                  alt=""
                  width={20}
                  height={20}
               />
               <p>{constraint.label}</p>
            </div>
         ))}
      </div>
   )
}

export default PasswordCriteria
