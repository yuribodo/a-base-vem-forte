import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const apiClient = axios.create({
	baseURL: `${apiUrl}`,
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export default apiClient;
