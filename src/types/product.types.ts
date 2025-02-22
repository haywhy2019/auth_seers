export type Role = {
   id: number
   version: number
   delFlag: string
   deletedOn: string | null
   dateCreated: string
   name: string
   uuid: string
}

export type Products = {
   id: number
   version: number
   delFlag: string
   deletedOn: string | null
   dateCreated: string
   productName: string
   prices: Price[]
   description: string
   features: string[]
   url: string
   activeFlag: boolean
   roles: Role[]
}

export type Price = {
   id: number
   version: number
   delFlag: string
   deletedOn: string | null
   dateCreated: string
   priceType: "MONTHLY" | "QUARTERLY" | "ANNUALLY"
   credit: number | null
   amount: number
}

export type PaymentPlan = "credit" | "monthly" | "quarterly" | "yearly"

export type ProductPricing = {
   productId: number
   amount: string
   credit: number
   rate: number
   priceType: string
}
