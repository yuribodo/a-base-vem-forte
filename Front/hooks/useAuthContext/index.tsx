"use client";
import apiClient from "@/axios";
import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";

const useAuthContext = () => {
	const context = useContext(AuthContext)!;

	if (!context) {
		throw new Error("useAuthContext must be used within an AuthProvider");
	}

	const [isLoading, setIsLoading] = useState(false);
	const [sucessMessage, setSucessMessage] = useState("");
	const { user, setUser, isLogged } = context;

	type loginTypes = {
		email: string;
		password: string;
	};

	type registerTypes = {
		firstName: string;
		lastName: string;
		documentType: string;
		email: string;
		cpf: string;
		enterpriseSegment: string;
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
		window.location.href = "/auth/login";
	};

	const onHandleRegister = async (registerUser: registerTypes) => {
		setIsLoading(true);
		try {
			const {
				cpf,
				documentType,
				email,
				enterpriseSegment,
				firstName,
				lastName,
				password,
				phoneNumber,
			} = registerUser;

			const newPayload = {
				cpf,
				documentType,
				email,
				enterpriseSegment,
				firstName,
				lastName,
				password,
				phoneNumber,
			}

			const responseLogin = await apiClient.post(
				"register/",
				newPayload
			);

			if (responseLogin.status !== 200) {
				throw new Error("Registro inválido");
			}

			setSucessMessage("Usuário cadastrado com sucesso!");
		} catch (error) {
			console.log(error);
			throw new Error("Login inválido");
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
