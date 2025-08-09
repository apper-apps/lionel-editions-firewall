import React from "react";
import { cn } from "@/utils/cn";

const Badge = React.forwardRef(({ 
  className, 
  variant = "default",
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium border transition-colors";
  
  const variants = {
    default: "bg-warm-gray-100 text-warm-gray-800 border-warm-gray-200",
    primary: "bg-primary-100 text-primary-800 border-primary-200",
    secondary: "bg-secondary-100 text-warm-gray-800 border-secondary-200",
    success: "bg-green-100 text-green-800 border-green-200",
    warning: "bg-orange-100 text-orange-800 border-orange-200",
    error: "bg-red-100 text-red-800 border-red-200",
    ebook: "badge-ebook",
    video: "badge-video",
    audio: "badge-audio",
    course: "badge-course",
  };
  
  return (
    <span
      className={cn(baseStyles, variants[variant], className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  );
});

Badge.displayName = "Badge";

export default Badge;