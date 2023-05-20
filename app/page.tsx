import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const metadata = {
  title: "Ehre",
  description:
    "Experience more with your friends by easily creating and participating in activities together!",
};

function Home() {
  return (
    <EmptyState
      title="This page does not exists yet"
      message="You can sign in/out below"
      className="h-full"
    >
      <div className="space-y-2">
        <Link href="/login" className={cn(buttonVariants(), "block w-full")}>
          Sign in
        </Link>
        <Link
          href="/signup"
          className={cn(buttonVariants({ variant: "outline" }), "block w-full")}
        >
          Sign up
        </Link>
      </div>
    </EmptyState>
  );
}

export default Home;
