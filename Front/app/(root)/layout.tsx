'use client'
import SideBar from "@/components/Layout/SideBar";
import Header from "@/components/Layout/Header";
import AuthProvider from "@/context/AuthContext";
import "../../styles/globals.css";
import useAuthContext from "@/hooks/useAuthContext";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<AuthProvider>
				<LayoutContent>{children}</LayoutContent>
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
