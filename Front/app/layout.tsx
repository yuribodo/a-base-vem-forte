import { montserrat } from "@/assets/fonts";

export const metadata = {
	title: "Eco Food",
	description: "Descrição do seu aplicativo.",
	keywords: ["Next.js", "Sustentabilidade", "Eco Food"],
	icons: {
		icon: {
			url: "/images/eco-food-logo-verde.webp",
			sizes: "192x192",
			type: "image/webp",
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="pt-br">
			<body className={montserrat.className}>{children}</body>
		</html>
	);
}
