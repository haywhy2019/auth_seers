/* eslint-disable */

export const enum userStatus {
   ACTIVE = "A",
   INACTIVE = "I",
}

export const enum userTypes {
   ORGANIZATION = "ORGANIZATION",
   STAFF = "STAFF",
   USER = "USER",
}

export const enum organizationTypes {
   CLINIC = "CLINIC",
   HOSPITAL = "HOSPITAL",
   LAB = "LAB",
   HMO = "HMO",
   PHARMACY = "PHARMACY",
}

export const enum cookieOptions {
   ACCESS_TOKEN_COOKIE = "token",
   REFRESH_TOKEN_COOKIE = "refresh_token",
   ACCESS_TOKEN_EXPIRY_COOKIE = "access_token_expiry",
   USER_DETAILS_COOKIE = "user",
   TENANT_ID_COOKIE = "X-TenantID",
   LAFIAHMS_CREDENTIALS_COOKIE = "cred",
}
