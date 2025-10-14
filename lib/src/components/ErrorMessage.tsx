import React from 'react';

interface ErrorMessageProps {
  message: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ 
  message, 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };

  return (
    <div 
      className={`text-destructive ${sizeClasses[size]} ${className}`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
};