import { montserrat } from "@/assets/fonts";
import AuthProvider from "@/context/AuthContext";

export default function LoginLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<AuthProvider>
			<div className={ `bg-transparent min-w-[400px] min-h-[390px] mx-auto flex flex-col items-center px-6 my-4 ${montserrat.className} `}>
				{children}
			</div>
		</AuthProvider>
		
	);
}
