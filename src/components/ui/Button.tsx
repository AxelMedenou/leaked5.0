import React from 'react';
import LoadingSpinner from './LoadingSpinner';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  size = 'md', 
  loading = false, 
  children, 
  className = '',
  disabled,
  ...props 
}: ButtonProps) {
  const baseClasses = 'font-bold tracking-wide transition-all duration-300 rounded-lg flex items-center justify-center space-x-2';
  
  const variantClasses = {
    primary: 'bg-white text-black hover:bg-gray-100',
    secondary: 'bg-white/10 text-white hover:bg-white/20 border border-white/20',
    ghost: 'text-white/60 hover:text-white hover:bg-white/10',
    danger: 'bg-red-500/20 text-red-400 hover:bg-red-500/30 border border-red-500/30'
  };

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base'
  };

  const isDisabled = disabled || loading;

  return (
    <button
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={isDisabled}
      {...props}
    >
      {loading && <LoadingSpinner size="sm" />}
      <span>{children}</span>
    </button>
  );
}