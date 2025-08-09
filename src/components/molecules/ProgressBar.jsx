import React from 'react';
import { cn } from '@/utils/cn';

const ProgressBar = ({ 
  progress = 0, 
  size = 'md', 
  variant = 'primary',
  showPercentage = true,
  animated = true,
  className,
  ...props 
}) => {
  const sizeClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
    xl: 'h-4'
  };

  const variantClasses = {
    primary: 'bg-gradient-to-r from-primary-400 to-accent-500',
    success: 'bg-gradient-to-r from-green-400 to-green-500',
    warning: 'bg-gradient-to-r from-orange-400 to-orange-500',
    error: 'bg-gradient-to-r from-red-400 to-red-500'
  };

  return (
    <div className={cn('w-full', className)} {...props}>
      <div className="flex items-center justify-between mb-1">
        {showPercentage && (
          <span className="text-xs font-medium text-warm-gray-600">
            {Math.round(progress)}%
          </span>
        )}
      </div>
      
      <div className={cn(
        'w-full bg-warm-gray-200 rounded-full overflow-hidden',
        sizeClasses[size]
      )}>
        <div
          className={cn(
            'h-full rounded-full transition-all duration-300 ease-out',
            variantClasses[variant],
            animated && 'animate-pulse-gold'
          )}
          style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;