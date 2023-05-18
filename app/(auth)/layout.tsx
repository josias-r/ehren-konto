import { validateCookieToken } from "@/lib/auth/validateCookieToken";
import { redirect } from "next/navigation";

export default async function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = await validateCookieToken();

  if (isLoggedIn !== false) {
    return redirect("/profile");
  }

  return <>{children}</>;
}
