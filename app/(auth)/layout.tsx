import { validateCookieToken } from "@/app/(auth)/validateCookieToken";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { redirect } from "next/navigation";

export default async function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isLoggedIn = validateCookieToken();

  if (isLoggedIn !== false) {
    return redirect("/");
  }

  return (
    <Toaster>
      <TooltipProvider>{children}</TooltipProvider>
    </Toaster>
  );
}
