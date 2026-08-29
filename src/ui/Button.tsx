"use client";

import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

const button = cva(
  "inline-flex select-none items-center justify-center gap-1.5 rounded-field border font-medium transition-colors duration-150 ease-out disabled:pointer-events-none disabled:border-hairline disabled:bg-paper disabled:text-ink-faint",
  {
    variants: {
      variant: {
        primary: "border-navy bg-navy text-sheet hover:bg-ink",
        secondary: "border-hairline-strong bg-sheet text-ink hover:border-navy hover:bg-navy-soft",
        quiet: "border-transparent bg-transparent text-ink-muted hover:bg-navy-soft hover:text-ink",
        accept: "border-verified bg-verified text-sheet hover:brightness-95",
        reject: "border-hairline-strong bg-sheet text-deletion hover:border-deletion hover:bg-deletion-soft",
      },
      size: {
        sm: "h-7 px-2.5 text-[12px]",
        md: "h-8 px-3 text-[13px]",
        lg: "h-10 px-4 text-[14px]",
      },
    },
    defaultVariants: { variant: "secondary", size: "md" },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  children?: ReactNode;
}

export function Button({ className, variant, size, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={cn(button({ variant, size }), className)} {...rest} />;
}
