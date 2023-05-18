import { buttonVariants } from "@/components/ui/button";
import { validateCookieToken } from "@/lib/auth/validateCookieToken";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Not found",
  description: "Page not found",
};

async function NotFound() {
  const isLoggedIn = validateCookieToken();

  return (
    <main className="flex h-full p-4">
      <div className="flex flex-col-reverse gap-12 items-center m-auto">
        <div>
          <h1 className="text-2xl font-bold mb-4">Wrong turn?</h1>
          <div className="grid gap-2 items-start">
            <Link
              className={cn(
                buttonVariants({ variant: "link" }),
                "block text-left p-0 h-auto text-muted-foreground"
              )}
              href="/"
            >
              🏠 home
            </Link>
            {isLoggedIn === false && (
              <>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "block text-left p-0 h-auto text-muted-foreground"
                  )}
                  href="/login"
                >
                  👉 sign in
                </Link>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "block text-left p-0 h-auto text-muted-foreground"
                  )}
                  href="/signup"
                >
                  👆 sign up
                </Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link
                  className={cn(
                    buttonVariants({ variant: "link" }),
                    "block text-left p-0 h-auto text-muted-foreground"
                  )}
                  href="/profile"
                >
                  🧑🏻 profile
                </Link>
              </>
            )}
          </div>
        </div>
        <Image
          className="block mx-auto rounded-lg overflow-hidden border-2 border-white"
          src="/abstract-empty-state-illustration.png"
          width={300}
          height={300}
          alt="404 abstract illustration"
        />
      </div>
    </main>
  );
}

export default NotFound;
