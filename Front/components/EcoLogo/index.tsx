import Image from "next/image";

interface PSPLogoProps {
	height: number;
	width: number;
}
const EcoLogo: React.FC<PSPLogoProps> = ({ height, width }) => {
	return (
		<Image
			src="/images/eco-food-logo-verde.webp"
			width={width}
			height={height}
			alt="Logo da empresa Eco Food"
		/>
	);
};

export default EcoLogo;
