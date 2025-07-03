import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 rounded-xl blur-sm group-hover:blur-md transition-all duration-300"></div>
      <div className={`
        relative bg-black/50 backdrop-blur-xl border border-white/20 rounded-xl
        ${hover ? 'hover:border-white/30 cursor-pointer' : ''}
        transition-all duration-300
        ${className}
      `}>
        {children}
      </div>
    </div>
  );
}