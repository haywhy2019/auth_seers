export type Permission = {
   id: number
   version: number
   delFlag: "N"
   deletedOn: null
   dateCreated: string
   description: null
   code: string
   category: string
}

export type Role = {
   id: number
   version: number
   delFlag: "N"
   deletedOn: null
   dateCreated: string
   name: string
   description: null
   permissions: Permission[]
   lastUpdatedTime: null
   teamMembers: 14
   roleType: null
   createdBy: null
   tenantId: string
}

export type User = {
   id: number
   version: number
   dateCreated: string
   organizationName: string
   organizationType: "CLINIC" | "LAB" | "HMO" | "PHARMACY"
   tenantId: string
   userName: string
   fullName: string
   firstName: string
   lastName: string
   email: string
   phoneNumber: string
   expiryDate: string
   lastLoginDate: string
   status: "a" | "i" // a = active, i = inactive
   accountStatus: null
   userType: "ORGANIZATION" | "USER" | "STAFF"
   pinReset: boolean
   needSetup: boolean
   changePassword: boolean
   selfRegistration: boolean
   middleName: string
   gender: string
   role: Role
   permissions: null
   lafiaHMSPermissions: null
   lafiaLabsPermissions: null
   lafiaERPPermissions: null
   onLien: boolean
}

export type Products = {
   id: number; 
   version: number; 
   delFlag: 'N' | 'Y'; 
   deletedOn: string | null; 
   dateCreated: string; 
   productName: string; 
   prices: {
     credit: number; 
     monthly: number; 
     quarterly: number; 
     yearly: number; 
   };
   description: string; 
   features: string[]; 
 };
 