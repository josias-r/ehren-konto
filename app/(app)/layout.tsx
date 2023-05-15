import { validateCookieToken } from "@/lib/auth/validateCookieToken";
import { notFound } from "next/navigation";

export default async function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = validateCookieToken();

  if (isLoggedIn === false) {
    return notFound();
  }

  return <>{children}</>;
}
