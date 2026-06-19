import { redirect } from "next/navigation";
import { AuthScreen } from "@/components/auth/AuthScreen";
import { getSession } from "@/lib/session";

export default async function RegisterPage() {
  const session = await getSession();

  if (session?.user) {
    redirect("/dashboard");
  }

  return <AuthScreen mode="register" />;
}
