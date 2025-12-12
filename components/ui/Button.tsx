import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "px-5 py-3 rounded-lg font-bold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-[0.98]";
  
  const variants = {
    primary: "bg-[#CCFF00] text-[#0D1117] hover:bg-[#E6FF66] hover:-translate-y-0.5 shadow-[0_0_10px_rgba(204,255,0,0.2)] hover:shadow-[0_0_15px_rgba(204,255,0,0.4)] border border-transparent",
    secondary: "bg-[#00FFFF] text-[#0D1117] hover:bg-[#66FFFF] hover:-translate-y-0.5 shadow-[0_0_10px_rgba(0,255,255,0.2)] border border-transparent",
    outline: "bg-transparent text-[#00FFFF] border border-[#00FFFF] hover:bg-[#00FFFF] hover:text-[#0D1117]",
  };

  const widthStyle = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${widthStyle} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};