import type { ButtonHTMLAttributes, ReactNode } from "react";

type NitcoButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "primary" | "ink" | "ghost" | "cream";
};

export function NitcoButton({ children, className = "", variant = "primary", ...props }: NitcoButtonProps) {
  const variants = {
    primary: "bg-terracotta text-cream hover:bg-ink",
    ink: "bg-ink text-cream hover:bg-terracotta",
    ghost: "border border-ink/20 bg-transparent text-ink hover:border-terracotta hover:text-terracotta",
    cream: "bg-cream text-ink hover:bg-ink hover:text-cream",
  };

  return (
    <button
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}