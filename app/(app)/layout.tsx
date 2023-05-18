import Nav from "@/components/Nav";
import { validateCookieToken } from "@/lib/auth/validateCookieToken";
import getProfileIsIncomplete from "@/lib/user/getProfileIsIncomplete";
import { notFound, redirect } from "next/navigation";

export default async function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = await validateCookieToken();

  if (isLoggedIn === false) {
    return notFound();
  }

  const profileIncomplete = await getProfileIsIncomplete(isLoggedIn.userId);

  if (profileIncomplete) {
    return redirect("/complete-profile");
  }

  return (
    <>
      {children} <Nav />
    </>
  );
}
