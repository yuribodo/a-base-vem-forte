import { montserrat } from "@/assets/fonts";
import ToastProvider from "@/components/ToastProvider";
import AuthProvider from "@/context/AuthContext";

export default function RegisterLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ToastProvider>
			<AuthProvider>
				<div
					className={`bg-transparent min-w-[400px] min-h-[390px] mx-auto flex flex-col items-center px-6 ${montserrat.className} `}
				>
					{children}
				</div>
			</AuthProvider>
		</ToastProvider>
	);
}
