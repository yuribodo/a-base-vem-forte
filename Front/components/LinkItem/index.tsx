import Link from "next/link";

interface LinkProps {
	children: React.ReactNode;
	href: string;
	target?: string;
	className?: string;
}
const LinkItem: React.FC<LinkProps> = ({
	children,
	href,
	className,
	target,
}) => {
	return (
		<Link href={href} className={className} target={target}>
			{children}
		</Link>
	);
};

export default LinkItem;
