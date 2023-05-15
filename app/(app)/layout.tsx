import { validateCookieToken } from "@/lib/auth/validateCookieToken";
import { notFound } from "next/navigation";

export default async function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = await validateCookieToken();

  if (isLoggedIn === false) {
    notFound();
  }

  return <>{children}</>;
}
