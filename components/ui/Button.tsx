import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  type?: 'button' | 'submit';
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
}) => {
  const baseStyles = 'px-8 py-4 text-lg font-semibold rounded-full transition-all duration-300 cursor-pointer';

  const variants = {
    primary: 'bg-black text-white hover:bg-gray-800 hover:scale-105 shadow-xl hover:shadow-2xl',
    secondary: 'bg-white text-black hover:bg-gray-100 hover:scale-105 shadow-xl hover:shadow-2xl',
    outline: 'bg-transparent border-2 border-white text-white hover:bg-white hover:text-black',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
