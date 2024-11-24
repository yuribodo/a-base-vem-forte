"use client";

import { usePathname } from "next/navigation";
import SideBar from "@/components/Layout/SideBar";
import Header from "@/components/Layout/Header";
import AuthProvider from "@/context/AuthContext";
import "../../styles/globals.css";
import { montserrat } from "@/assets/fonts";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const pathname = usePathname();

	const excludedRoutes = ["/auth/login", "/auth/register"];
	const currentPath = pathname.split("?")[0];

	if (currentPath === "/") {
		return (
			<body className={`h-screen flex flex-col ${montserrat.className}`}>
				<Header />
				<div className="flex flex-grow w-full">
					<main className="flex-grow">{children}</main>
				</div>
			</body>
		);
	}

	if (excludedRoutes.includes(currentPath)) {
		return <body>{children}</body>;
	}

	return (
		<body className={`h-screen flex flex-col ${montserrat.className}`}>
			<AuthProvider>
				<Header />
				<div className="flex flex-grow w-full">
					<SideBar className="hidden lg:block" />
					<main className="flex-grow">{children}</main>
				</div>
			</AuthProvider>
		</body>
	);
}
