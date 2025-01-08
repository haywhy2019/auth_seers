import * as Yup from "yup"

export const loginSchema = Yup.object({
   email: Yup.string().email("Please enter a valid email address").required("Email is required"),
   password: Yup.string().required("Password is required"),
})

export const signupSchema = Yup.object({
   organizationType: Yup.string().required("Facility Type is required"),
   firstName: Yup.string().required("First Name is required"),
   lastName: Yup.string().required("Last Name is required"),
   organizationName: Yup.string().required("Organisation Name is required"),
   email: Yup.string().email("Please enter a valid email address").required("Email is required"),
   password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 characters or more")
      .test("lowercase", "Password must include at least one lowercase letter", (value) =>
         /[a-z]/.test(value || ""),
      )
      .test("uppercase", "Password must include at least one uppercase letter", (value) =>
         /[A-Z]/.test(value || ""),
      )
      .test("number", "Password must include at least one number", (value) =>
         /[0-9]/.test(value || ""),
      )
      .test("special-character", "Password must include at least one special character", (value) =>
         /\W/.test(value || ""),
      ),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
})

export const forgotPasswordSchema = Yup.object({
   email: Yup.string().email("Please enter a valid email address").required("Email is required"),
})

export const resetPasswordSchema = Yup.object({
   newPassword: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 characters or more")
      .test("lowercase", "Password must include at least one lowercase letter", (value) =>
         /[a-z]/.test(value || ""),
      )
      .test("uppercase", "Password must include at least one uppercase letter", (value) =>
         /[A-Z]/.test(value || ""),
      )
      .test("number", "Password must include at least one number", (value) =>
         /[0-9]/.test(value || ""),
      )
      .test("special-character", "Password must include at least one special character", (value) =>
         /\W/.test(value || ""),
      ),
   confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword")], "Passwords must match")
      .required("Confirm Password is required"),
})

export const otpSchema = Yup.object({
   otp: Yup.string().required("OTP is required"),
})
