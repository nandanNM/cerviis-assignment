import React from "react";

export const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "destructive" }>(
  ({ className = "", variant = "default", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 disabled:pointer-events-none disabled:opacity-50 h-9 px-4 py-2";
    const variants = {
      default: "bg-zinc-900 text-zinc-50 shadow hover:bg-zinc-900/90",
      outline: "border border-zinc-200 bg-white shadow-sm hover:bg-zinc-100 hover:text-zinc-900",
      destructive: "bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90"
    };
    return <button ref={ref} className={`${baseStyles} ${variants[variant]} ${className}`} {...props} />;
  }
);
Button.displayName = "Button";
