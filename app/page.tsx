import { buttonVariants } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
