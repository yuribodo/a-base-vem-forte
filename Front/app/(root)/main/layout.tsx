import SideBar from "@/components/Layout/SideBar";
import '@/styles/globals.css'
import Header from "@/components/Layout/Header";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-br">
			<body>
                <Header/>
                <div className="flex">
					<SideBar className="hidden lg:block"/>
                    {children}
                </div>
			</body>
		</html>
	);
}
