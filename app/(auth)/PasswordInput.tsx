"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import useDebounce from "@/lib/hooks/useDebounce";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  validatePasswordStrength?: boolean;
}

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, validatePasswordStrength, ...props }, ref) => {
    const [value, setValue] = React.useState("");
    const debouncedValue = useDebounce(value, 1000);
    const [pwValidationResult, setPwValidationResult] = React.useState<{
      error: string;
      pwValidationMessages: string[];
    }>();

    const [passwordShown, setPasswordShown] = React.useState(false);

    React.useEffect(() => {
      if (debouncedValue && validatePasswordStrength) {
        fetch(`/api/validate-password?password=${debouncedValue}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((res) => res.json())
          .then((response) => {
            console.log("response", response);

            if (response?.data?.error) {
              setPwValidationResult(response.data);
            } else {
              setPwValidationResult(undefined);
            }
          });
      } else {
        setPwValidationResult(undefined);
      }
    }, [debouncedValue, validatePasswordStrength]);

    return (
      <div className="relative">
        <div className="relative">
          <input
            type={passwordShown ? "text" : "password"}
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
              "mb-2",
              className
            )}
            ref={ref}
            {...props}
            onChange={(...args) => {
              props.onChange?.(...args);
              console.log("args", args);

              setValue(args[0].target.value);
            }}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-muted-foreground"
            onClick={() => setPasswordShown(!passwordShown)}
          >
            {passwordShown ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        {!!pwValidationResult?.pwValidationMessages?.length && (
          <div className="text-xs">
            {pwValidationResult?.pwValidationMessages?.map((msg, i) => (
              <div key={i} className="text-destructive">
                {msg}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
