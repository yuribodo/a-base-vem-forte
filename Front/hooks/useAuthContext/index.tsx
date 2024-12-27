"use client";
import apiClient from "@/axios";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/components/ReactToast";

const useAuthContext = () => {
	const context = useContext(AuthContext)!;

	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}

	const router = useRouter();

	const [isLoading, setIsLoading] = useState(false);
	const [sucessMessage, setSucessMessage] = useState("");
	const { user, setUser, isLogged, setIsLogged } = context;

	type loginTypes = {
		email: string;
		password: string;
	};

	type registerTypes = {
		firstName: string;
		lastName: string;
		document_type: string;
		email: string;
		document: string;
		enterprise_segment: string;
		password: string;
		phoneNumber: string;
	};

	const onHandleLogin = async (authLogin: loginTypes) => {
		try {
			setIsLoading(true);
			const responseLogin = await apiClient.post("login/", authLogin);

			if (!responseLogin) {
				throw new Error("Login inválido");
			}

			setUser(responseLogin.data);
			setIsLogged(true);
			const token = responseLogin.data.token;
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(responseLogin.data));
		} catch (error) {
			console.log(error);
			throw new Error("Login inválido");
		} finally {
			setIsLoading(false);
		}
	};

	const onHandleLogout = () => {
		localStorage.removeItem("token");
		localStorage.removeItem("user");
		setUser(null);
		setIsLogged(false);
		window.location.href = "/auth/login";
	};

	const onHandleRegister = async (
		registerUser: registerTypes,
		setError: any
	) => {
		setIsLoading(true);
		try {
			const {
				document,
				document_type,
				email,
				enterprise_segment,
				firstName,
				lastName,
				password,
				phoneNumber,
			} = registerUser;

			const newPayload = {
				document,
				document_type,
				email,
				enterprise_segment,
				firstName,
				lastName,
				password,
				phoneNumber,
			};
			console.log(newPayload);

			const responseLogin = await apiClient.post("register/", newPayload);
			console.log(responseLogin);

			if (responseLogin.status !== 201) {
				throw new Error("Registro inválido");
			}

			setSucessMessage("Usuário cadastrado com sucesso!");
			showToast("success", "Usuário cadastrado com sucesso!");

			router.push("/auth/login");
			return true;
		} catch (error: any) {
			if (error.response && error.response.data) {
				const apiErrors = error.response.data.errors || error.response.data;

				Object.keys(apiErrors).forEach((field) => {
					setError(field, {
						type: "server",
						message: apiErrors[field],
					});
				});
			} else {
				setError("root", {
					type: "server",
					message: "Ocorreu um erro desconhecido ao registrar.",
				});
			}
		} finally {
			setIsLoading(false);
		}
	};

	return {
		user,
		setUser,
		onHandleLogin,
		onHandleLogout,
		onHandleRegister,
		isLoading,
		sucessMessage,
		isLogged,
	};
};

export default useAuthContext;
