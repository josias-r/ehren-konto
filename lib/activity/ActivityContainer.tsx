import { cn } from "@/lib/utils";
import { forwardRef } from "react";

const ActivityContainer = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div className="w-full relative after:pb-[100%] after:w-full after:block">
    <div
      ref={ref}
      className={cn("absolute top-0 left-0 h-full w-full rounded", className)}
      {...props}
    >
      {children}
    </div>
  </div>
));
ActivityContainer.displayName = "ActivityContainer";

export default ActivityContainer;
