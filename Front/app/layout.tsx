"use client";
import type { Metadata } from "next";
import SideBar from "@/components/Layout/SideBar";
import "../styles/globals.css";
import Header from "../components/Layout/Header";
import { usePathname } from "next/navigation";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();

	if (pathname === "/auth/login") {
		return (
			<html lang="en">
				<body>{children}</body>
			</html>
		);
	}

	if (pathname === "/auth/register") {
		return (
			<html lang="en">
				<body>{children}</body>
			</html>
		);
	}

	return (
		<html lang="en">
			<body>
				<Header />
				{children}
				<SideBar />
			</body>
		</html>
	);
}
