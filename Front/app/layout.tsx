import SideBar from "@/components/Layout/SideBar";
import "../styles/globals.css";
import Header from "../components/Layout/Header";


export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body>
				{children}
			</body>
		</html>
	);
}
