'use client';

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string; 
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`inline-flex items-center justify-center px-4 py-2 text-sm font-medium  rounded-md ${className} ease-in-out trasnition duration-300`}
    >
      {children}
    </button>
  );
};

export default Button;
