import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode, forwardRef } from "react";

export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  message: ReactNode;
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ title, message, className, children, ...props }, ref) => {
    return (
      <div className={cn("flex", className)} ref={ref} {...props}>
        <div className="m-auto text-center">
          <div className="mb-12">
            <Image
              className="block mx-auto rounded-lg overflow-hidden border-2 border-white"
              src="/abstract-empty-state-illustration.png"
              width={150}
              height={150}
              alt="Empty state illustration"
            />
          </div>
          <h3 className="text-lg font-semibold leading-none tracking-tight mb-4">
            {title}
          </h3>
          <div className="mx-auto max-w-[200px] text-sm text-muted-foreground mb-6">
            {message}
          </div>
          {children}
        </div>
      </div>
    );
  }
);
EmptyState.displayName = "EmptyState";

export { EmptyState };
