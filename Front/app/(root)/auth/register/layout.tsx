export default function RegisterLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="bg-transparent min-w-[400px] min-h-[390px] mx-auto flex flex-col items-center px-6">
			{children}
		</div>
	);
}
