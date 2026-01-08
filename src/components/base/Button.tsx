
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md', 
  className = '',
  disabled = false 
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-xl transition-all duration-300 flex items-center justify-center shadow-md hover:shadow-lg';
  
  const variantClasses = {
    primary: 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:from-pink-600 hover:to-rose-600 active:scale-95',
    secondary: 'bg-gradient-to-r from-emerald-400 to-teal-400 text-white hover:from-emerald-500 hover:to-teal-500 active:scale-95',
    outline: 'border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 active:scale-95'
  };
  
  const sizeClasses = {
    sm: 'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm',
    md: 'px-4 sm:px-5 py-2 sm:py-2.5 text-sm sm:text-base',
    lg: 'px-5 sm:px-6 py-2.5 sm:py-3 text-base sm:text-lg'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </button>
  );
}
