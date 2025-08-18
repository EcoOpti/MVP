import { ButtonHTMLAttributes, forwardRef } from "react";
import { clsx } from "clsx";

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" }
>(({ className, variant = "primary", ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={clsx(
        "btn",
        variant === "primary" ? "btn-primary" : "btn-ghost",
        className,
      )}
      {...props}
    />
  );
});
Button.displayName = "Button";

