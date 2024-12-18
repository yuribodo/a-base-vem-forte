import { Product } from "@/components/TableProducts";

export const filterProductsByTab = (
	products: Product[],
	tab: "expired" | "aboutToExpire"
): Product[] => {
	return tab === "expired"
		? products.filter((product) => new Date(product.expiration_date) < new Date())
		: products.filter((product) => new Date(product.expiration_date) >= new Date());
};

export const calculateTotalValue = (products: Product[]): number => {
	return products.reduce(
		(acc, product) => acc + product.price * product.quantity,
		0
	);
};

export const countDonatedProducts = (products: Product[]): number => {
	return products.filter(
		(product) => product.destination === "DONATION"
	).length;
};

export const calculateDonatedProductsValue = (products: Product[]): number => {
	return products
		.filter((product) => product.destination === "DONATION")
		.reduce((acc, product) => acc + product.price * product.quantity, 0);
};


export const calculateTrashProductsValue = (products: Product[]): number => {
	return products
		.filter((product) => product.destination === "TRASH")
		.reduce((acc, product) => acc + product.price * product.quantity, 0);
};
