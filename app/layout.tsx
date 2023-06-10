import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { validateCookieToken } from "@/app/(auth)/validateCookieToken";
import ServiceWorkerProvider from "@/components/ServiceWorkerProvider";

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
          href="/favicon/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link
          rel="mask-icon"
          href="/favicon/safari-pinned-tab.svg"
          color="#5bbad5"
        />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <meta name="msapplication-TileColor" content="#00aba9" />
        <meta
          name="msapplication-config"
          content="/favicon/browserconfig.xml"
        />
        <meta name="theme-color" content="#030711" />
      </head>
      <body className={`${inter.className} bg-background h-full`}>
        <ServiceWorkerProvider>
          {isLoggedIn && (
            <Toaster>
              <TooltipProvider>{app}</TooltipProvider>
            </Toaster>
          )}
          {!isLoggedIn && children}
        </ServiceWorkerProvider>
      </body>
    </html>
  );
}
