import { cn } from "@/utils/shadcn";
import { Eye, EyeOff } from "lucide-react";
import { ComponentProps, forwardRef, useState } from "react";
import { Input } from "./input";

type PasswordInputProps = Omit<ComponentProps<"input">, "type">;

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    return (
      <div className={cn("relative", className)}>
        <Input
          type={isPasswordVisible ? "text" : "password"}
          className={cn("pr-10", className)}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          className="p-2 absolute top-1/2 right-1 -translate-y-1/2"
          onClick={() => setIsPasswordVisible((prev) => !prev)}
          aria-label={isPasswordVisible ? "Hide password" : "Show password"}
        >
          {!isPasswordVisible && <Eye className="w-6 h-6 text-foreground" />}
          {isPasswordVisible && <EyeOff className="w-6 h-6 text-foreground" />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
