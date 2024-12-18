import { Product } from "@/components/TableProducts";

export const daysLeft = (product: Product) => {
	const today = new Date();
	const expirationDate = new Date(product.expiration_date);
	const timeDiff = expirationDate.getTime() - today.getTime();
	const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
	return days;
};
