import React from "react";
import { cn } from "@/utils/cn";

const Card = React.forwardRef(({ 
  className, 
  children, 
  variant = "default",
  hover = false,
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-xl shadow-soft border border-warm-gray-100 transition-all duration-200";
  
  const variants = {
    default: "",
    golden: "border-primary-200 bg-gradient-to-br from-white to-secondary-50",
    elevated: "shadow-golden",
  };
  
  const hoverStyles = hover ? "hover-lift cursor-pointer" : "";
  
  return (
    <div
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;