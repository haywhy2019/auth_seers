import * as Yup from "yup"

export const loginSchema = Yup.object({
   email: Yup.string().email("Please enter a valid email address").required("Email is required"),
   password: Yup.string()
      .min(8, "Password must be 8 characters or more")
      .required("Password is required"),
})

export const signupSchema = Yup.object({
   organizationType: Yup.string().required("Facility Type is required"),
   organizationName: Yup.string().required("Organisation Name is required"),
   email: Yup.string().email("Please enter a valid email address").required("Email is required"),
   password: Yup.string()
      .min(8, "Password must be 8 characters or more")
      .required("Password is required"),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
})

export const forgotPasswordSchema = Yup.object({
   email: Yup.string().email("Please enter a valid email address").required("Email is required"),
})

export const resetPasswordSchema = Yup.object({
   password: Yup.string()
      .min(8, "Password must be 8 characters or more")
      .required("Password is required"),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
})

export const otpSchema = Yup.object({
   otp: Yup.string().required("OTP is required"),
})
