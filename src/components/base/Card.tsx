
import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  style?: CSSProperties;
}

export default function Card({ children, className = '', onClick, style }: CardProps) {
  return (
    <div 
      className={`bg-white/95 backdrop-blur-sm rounded-2xl shadow-md border border-white/50 ${onClick ? 'cursor-pointer hover:shadow-lg hover:scale-[1.02] transition-all duration-300' : ''} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
