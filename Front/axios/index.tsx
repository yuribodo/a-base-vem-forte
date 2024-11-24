import axios from "axios";

const apiClient = axios.create({
	baseURL: "https://localhost:3000",
	headers: {
		"Content-Type": "application/json",
		Accept: "application/json",
	},
});

export default apiClient;
