import React from "react";
import { cn } from "@/utils/cn";

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  children, 
  disabled,
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    primary: "gradient-gold text-white shadow-sm hover:shadow-golden hover:scale-105",
    secondary: "bg-white text-warm-gray-900 border-2 border-primary-300 hover:border-primary-500 hover:bg-secondary-50 hover:scale-105",
    ghost: "text-warm-gray-600 hover:text-primary-600 hover:bg-secondary-50",
    outline: "border-2 border-warm-gray-300 bg-white hover:border-primary-500 hover:text-primary-600",
    danger: "bg-red-500 text-white hover:bg-red-600 shadow-sm hover:shadow-lg",
  };
  
  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
    xl: "px-10 py-5 text-xl",
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;