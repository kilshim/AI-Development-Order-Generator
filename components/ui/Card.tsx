import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-[#21262D] p-6 rounded-xl border border-[rgba(0,255,255,0.1)] shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${className}`}>
      {children}
    </div>
  );
};