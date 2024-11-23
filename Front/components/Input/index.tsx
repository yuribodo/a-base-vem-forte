"use client";

import React, { forwardRef } from "react";

interface InputProps {
	type?: "text" | "email" | "password" | "number" | "tel" | "date";
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	className?: string;
	ref?: React.Ref<HTMLInputElement>;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{ type = "text", placeholder = "", value, onChange, className = "" },
		ref
	) => {
		return (
			<input
				ref={ref}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				className={`w-full px-4 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-[#3a8b40] focus:border-[#3a8b40] transition-all ${className}`}
			/>
		);
	}
);

Input.displayName = "Input";

export default Input;
