import SideBar from "@/components/Layout/SideBar";
import "@/styles/globals.css";
import Header from "@/components/Layout/Header";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body className="h-screen flex flex-col">
				<Header />
				<div className="flex flex-grow w-full">
					<SideBar />
					<main className="flex-grow">{children}</main>
				</div>
			</body>
		</html>
	);
}
