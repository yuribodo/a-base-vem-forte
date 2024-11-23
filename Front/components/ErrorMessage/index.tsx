const ErroMessage = ({ children }: { children: React.ReactNode }) => {
	return <span className="text-red-500 text-sm">{children}</span>;
};

export default ErroMessage;
