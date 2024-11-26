import { authRoutes } from "@/helpers/routes";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(authRoutes.login);
}
