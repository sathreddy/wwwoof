import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#f7f1de] text-[#33495f] border border-[#e5e5e5]",
        green: "bg-green-50 text-green-700 border border-green-200",
        outline: "border border-[#d1d5db] text-[#55677a]",
        muted: "bg-stone-100 text-stone-600",
        adopted: "bg-stone-200 text-stone-500",
        success: "bg-[#5281a2] text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
