export const formattedDate = (date: string) => {
	return new Date(date).toLocaleDateString("pt-BR");
};
