"use client";
import { usePathname } from "next/navigation";
import SideBar from "@/components/Layout/SideBar";
import Header from "@/components/Layout/Header";
import AuthProvider from "@/context/AuthContext";
import "../../styles/globals.css";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const pathname = usePathname();

	const excludedRoutes = ["/auth/login", "/auth/register"];

	const shouldExcludeLayout = excludedRoutes.includes(pathname);

	return (
		<html lang="pt-br">
			<AuthProvider>
				{shouldExcludeLayout ? (
					<html>
						<body>{children}</body>
					</html>
				) : (
					<LayoutContent>{children}</LayoutContent>
				)}
			</AuthProvider>
		</html>
	);
}

function LayoutContent({ children }: { children: React.ReactNode }) {
	return (
		<body className="h-screen flex flex-col">
			<Header />
			<div className="flex flex-grow w-full">
				<SideBar className="hidden lg:block" />
				<main className="flex-grow">{children}</main>
			</div>
		</body>
	);
}
