const Label = ({
	children,
	htmlFor,
}: {
	children: React.ReactNode;
	htmlFor: string;
}) => {
	return (
		<label htmlFor={htmlFor} className="text-[16px]">
			{children}
		</label>
	);
};

export default Label;
