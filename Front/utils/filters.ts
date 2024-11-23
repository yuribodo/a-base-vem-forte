import { MockedProducts } from "@/components/TableProducts";

export const filterProductsByTab = (
	products: MockedProducts[],
	tab: "expired" | "aboutToExpire"
): MockedProducts[] => {
	return tab === "expired"
		? products.filter((product) => new Date(product.validade) < new Date())
		: products.filter((product) => new Date(product.validade) >= new Date());
};

export const calculateTotalValue = (products: MockedProducts[]): number => {
	return products.reduce(
		(acc, product) => acc + product.preco * product.quantidade,
		0
	);
};

export const countDonatedProducts = (products: MockedProducts[]): number => {
	return products.filter(
		(product) => product.destino.toLowerCase() === "doação"
	).length;
};

export const calculateDonatedProductsValue = (
	products: MockedProducts[]
): number => {
	return products
		.filter((product) => product.destino.toLowerCase() === "doação")
		.reduce((acc, product) => acc + product.preco * product.quantidade, 0);
};
