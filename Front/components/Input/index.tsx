"use client";

import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	({ type = "text", placeholder = "", className = "", ...props }, ref) => {
		return (
			<input
				ref={ref}
				type={type}
				placeholder={placeholder}
				className={`w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a8b40] focus:border-[#3a8b40] transition-all ${className}`}
				{...props}
			/>
		);
	}
);

Input.displayName = "Input";

export default Input;
