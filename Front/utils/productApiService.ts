import apiClient from "@/axios";

export const handleRecycle = async (
	selectedProductId: number | null,
	productQuantity: number
) => {
	if (!selectedProductId) return;
	try {
		const response = await apiClient.patch(
			`/api/products/${selectedProductId}/status/`,
			{
				action: "recycle",
				quantity: productQuantity,
			}
		);
		console.log("Product recycled:", response.data);
		return "success";
	} catch (error) {
		console.error("Error updating product:", error);
	}
};
export const handleDiscard = async (
	selectedProductId: number | null,
	productQuantity: number
) => {
	if (!selectedProductId) return;
	try {
		const response = await apiClient.patch(
			`/api/products/${selectedProductId}/status/`,
			{
				action: "discard",
				quantity: productQuantity,
			}
		);
		console.log("Product discarded:", response.data);
		return "success";
	} catch (error) {
		console.error("Error updating product:", error);
	}
};

export const handleDelete = async (selectedProductId: number | null) => {
	if (!selectedProductId) return;
	try {
		const response = await apiClient.delete(
			`/api/products/${selectedProductId}/`
		);
		console.log("Product deleted:", response.data);
		return "success";
	} catch (error) {
		console.error("Error deleting product:", error);
	}
};
