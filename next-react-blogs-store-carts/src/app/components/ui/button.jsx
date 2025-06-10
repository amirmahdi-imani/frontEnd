import { cn } from "@/lib/utils"
import React from "react"

export const buttonVariants = {
  default: "bg-black text-white hover:bg-gray-900",
  outline: "border border-black text-black hover:bg-gray-100",
}

export const Button = React.forwardRef(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
          buttonVariants[variant],
          className
        )}
        {...props}
      />
    )
  }
)

Button.displayName = "Button"
