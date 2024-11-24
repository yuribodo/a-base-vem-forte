import { MockedProducts } from "@/components/TableProducts";

export const daysLeft = (product: MockedProducts) => {
	const today = new Date();
	const expirationDate = new Date(product.validade);
	const timeDiff = expirationDate.getTime() - today.getTime();
	const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
	return days;
};
