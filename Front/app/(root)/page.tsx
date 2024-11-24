"use client";
import useAuthContext from "@/hooks/useAuthContext";
import React from "react";
import Banner from "../../components/Banner";
import FeaturesSection from "../../components/FeaturesSection";

export default function Home() {
	const { user } = useAuthContext();

	return (
		<main className="w-full h-full min-h-screen">
			<Banner/>
			<FeaturesSection/>
		</main>
	);
}
