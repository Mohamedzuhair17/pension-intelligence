import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-pp-purple text-white shadow-sm",
        secondary: "border-transparent bg-[rgba(255,255,255,0.08)] text-[var(--text-secondary)]",
        destructive: "border-transparent bg-[rgba(239,68,68,0.12)] text-[#EF4444]",
        success: "border-transparent bg-[rgba(16,185,129,0.12)] text-[#10B981]",
        warning: "border-transparent bg-[rgba(245,158,11,0.12)] text-[#F59E0B]",
        info: "border-transparent bg-[rgba(59,130,246,0.12)] text-[#3B82F6]",
        outline: "text-[var(--text-secondary)] border-[rgba(255,255,255,0.1)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
