import { cn } from "@/lib/utils"
import React from "react"

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn(
        "flex w-full rounded-xl border border-gray-300 bg-gray-300 px-3 py-2 text-sm shadow-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-black",
        className
      )}
      {...props}
    />
  )
})

Input.displayName = "Input"
