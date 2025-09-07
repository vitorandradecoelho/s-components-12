import React from 'react';
import { AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export interface AlertProps {
  /** Alert variant */
  variant?: 'default' | 'destructive' | 'success' | 'warning';
  /** Alert title */
  title?: string;
  /** Alert description/content */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Show icon based on variant */
  showIcon?: boolean;
}

const variantIcons = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle,
  warning: AlertTriangle,
};

const variantStyles = {
  default: "border-border bg-background text-foreground",
  destructive: "border-red-500/50 bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400 [&>svg]:text-red-600",
  success: "border-green-500/50 bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400 [&>svg]:text-green-600",
  warning: "border-yellow-500/50 bg-yellow-50 text-yellow-700 dark:bg-yellow-950/20 dark:text-yellow-400 [&>svg]:text-yellow-600",
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'default',
  title,
  children,
  className,
  showIcon = true,
}) => {
  const IconComponent = variantIcons[variant];

  return (
    <div className={cn(
      "relative w-full rounded-lg border px-4 py-3 text-sm flex gap-3",
      variantStyles[variant],
      className
    )}>
      {showIcon && <IconComponent className="h-4 w-4 mt-0.5 flex-shrink-0" />}
      <div className="flex-1">
        {title && (
          <h5 className="mb-1 font-medium leading-none tracking-tight">
            {title}
          </h5>
        )}
        <div className="text-sm [&_p]:leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
};