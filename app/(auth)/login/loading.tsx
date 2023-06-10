import { Skeleton } from "@/components/ui/skeleton";

interface LoadingProps {}

function Loading({}: LoadingProps) {
  return (
    <main className="p-4 h-full max-w-md mx-auto grid items-center">
      <div className="space-y-4">
        <Skeleton className="h-32 w-32 rounded-md mx-auto" />
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </main>
  );
}

export default Loading;
