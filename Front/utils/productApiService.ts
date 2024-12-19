import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const handleRecycle = async (selectedProductId: number | null) => {
    if(!selectedProductId) return;
    try {
        const response = await axios.patch(`${BASE_URL}/api/products/${selectedProductId}/status/`, {
            destination: 'DONATION'
        });
        console.log("Product recycled:", response.data);
        return 'success';
    }
    catch (error) {
        console.error("Error updating product:", error);
    }
}
export const handleDiscard = async (selectedProductId: number | null) => {
    if(!selectedProductId) return;
    try {
        const response = await axios.patch(`${BASE_URL}/api/products/${selectedProductId}/status/`, {
            destination: 'TRASH'
        });
        console.log("Product discarded:", response.data);
        return 'success';
    }
    catch (error) {
        console.error("Error updating product:", error);
    }
}

export const handleDelete = async (selectedProductId: number | null) => {
    if(!selectedProductId) return;
    try {
        const response = await axios.delete(`${BASE_URL}/api/products/${selectedProductId}/`);
        console.log("Product deleted:", response.data);
        return 'success';
    }
    catch (error) {
        console.error("Error deleting product:", error);
    }
}
