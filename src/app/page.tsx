import { redirect } from "next/navigation"

import { authRoutes, } from "@/helpers/routes"

export default function Home() {
   redirect(authRoutes.login)
   // redirect(authRoutes.onboarding)
}
