'use client';

import React from "react";

interface InputProps {
  type?: "text" | "email" | "password" | "number" | "tel" | "date";
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string; 
}

const Input: React.FC<InputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  className = "",
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-[#3a8b40] focus:border-[#3a8b40] transition-all ${className}`}
    />
  );
};

export default Input;
