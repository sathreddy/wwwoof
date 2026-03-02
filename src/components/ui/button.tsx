"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5281a2] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-[#5281a2] text-white rounded-[1.5rem] shadow hover:bg-[#3d6a8a]",
        outline:
          "border border-[#d1d5db] text-[#33495f] rounded-[0.5rem] bg-transparent hover:bg-[#f7f1de]",
        ghost:
          "text-[#33495f] rounded-[0.5rem] hover:bg-[#f7f1de] hover:text-[#33495f]",
        secondary:
          "bg-[#f7f1de] text-[#33495f] border border-[#e5e5e5] rounded-[0.5rem]",
        destructive:
          "bg-red-500 text-white shadow hover:bg-red-600 rounded-[0.5rem]",
        link:
          "text-[#5281a2] underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-8 px-3 text-xs",
        lg: "h-12 px-8 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
