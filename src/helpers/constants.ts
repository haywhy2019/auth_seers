import { organizationTypes } from "./enum"

export const organizationTypeOptions = [
   { display: "Hospital", value: organizationTypes.HOSPITAL },
   { display: "Clinic", value: organizationTypes.CLINIC },
   { display: "Lab", value: organizationTypes.LAB },
   { display: "Pharmacy", value: organizationTypes.PHARMACY },
   { display: "HMO", value: organizationTypes.HMO },
]

export const healthCareGrouping = [
   { title: "Primary Healthcare Center", value: "1" },
   { title: "Secondary Healthcare Center", value: "2" },
   { title: "Tertiary Healthcare Center", value: "3" },
]
