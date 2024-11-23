const ErroMessage = ({ children }: { children: React.ReactNode }) => {
	return <span className="text-red-500 text-[10px]">{children}</span>;
};

export default ErroMessage;
