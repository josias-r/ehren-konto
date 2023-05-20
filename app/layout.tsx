import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
// import { validateCookieToken } from "@/lib/auth/validateCookieToken";
import Nav from "@/components/Nav";
import { validateCookieToken } from "@/app/(auth)/validateCookieToken";
const inter = Inter({ subsets: ["latin"] });

export default async function RootLayout({
  children,
  app,
}: {
  children: React.ReactNode;
  app: React.ReactNode;
}) {
  const isLoggedIn = validateCookieToken();
  return (
    <html lang="en" className="h-full">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta name="theme-color" content="#ffffff" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
      </head>
      <body className={`${inter.className} bg-background h-full`}>
        {isLoggedIn && (
          <>
            <TooltipProvider>
              {app}
              <Nav />
            </TooltipProvider>
            <Toaster />
          </>
        )}
        {!isLoggedIn && children}
      </body>
    </html>
  );
}
