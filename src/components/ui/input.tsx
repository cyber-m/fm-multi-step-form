import * as React from "react";

import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-12 w-full rounded-md border border-input bg-transparent px-4 py-1 text-primary text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-coolGray font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purplishBlue disabled:cursor-not-allowed disabled:opacity-50",
        "aria-[invalid=true]:focus-visible:ring-destructive aria-[invalid=true]:focus-visible:border-none aria-[invalid=true]:border-destructive",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
