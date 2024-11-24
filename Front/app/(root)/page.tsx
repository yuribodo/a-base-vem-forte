"use client";
import useAuthContext from "@/hooks/useAuthContext";
import React from "react";

export default function Home() {
	const { user } = useAuthContext();

	return (
		<>
			<p>oi</p>
		</>
	);
}
