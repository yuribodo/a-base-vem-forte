"use client";

import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import Spinner from "../SpinnerLoading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErroMessage from "../ErrorMessage";
import Label from "../Label";
import React from "react";

const registerSchema = z
	.object({
		name: z
			.string()
			.min(3, "O campo nome deve ter pelo menos 3 caracteres")
			.max(100, "O campo nome deve ter no maximo 100 caracteres"),
		email: z
			.string()
			.min(1, "O campo email é obrigatório")
			.email("O email não é valido, insira um email valido"),
		cpf: z
			.string()
			.min(11, "O campo cpf deve ter pelo menos 11 caracteres")
			.max(11, "O campo cpf deve ter no maximo 11 caracteres"),
		enterpriseSegment: z
			.string()
			.min(1, "O campo segmento empresarial é obrigatório"),
		password: z.string().min(6, "A sua senha deve ter no minimo 6 caracteres"),
		confirmPassword: z
			.string()
			.min(6, "A sua senha deve ter no minimo 6 caracteres"),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "As senhas devem ser iguais",
		path: ["confirmPassword"],
	});

type registerTypes = z.infer<typeof registerSchema>;

const FormRegister = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<registerTypes>({
		resolver: zodResolver(registerSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			email: "",
			cpf: "",
			enterpriseSegment: "",
			password: "",
			confirmPassword: "",
		},
	});
	const isLoading = true;

	const handleSubmitLogin = (dados: registerTypes) => {
		console.log(dados);
	};

	return (
		<form
			className="grid grid-cols-2 w-full gap-6"
			onSubmit={handleSubmit(handleSubmitLogin)}
		>
			<div className="flex flex-col gap-1 col-span-2">
				<Label htmlFor="name">Nome</Label>
				<Input
					placeholder="Insira seu nome..."
					type="text"
					className={`h-9 bg-transparent text-base border-[1px] rounded-md w-full ease-in-out duration-200 ${
						errors.password && "border-red-500"
					}`}
					{...register("name")}
				/>
				{errors.name && <ErroMessage>{errors.name.message}</ErroMessage>}
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor="email">Email</Label>
				<Input
					placeholder="Insira seu email..."
					type="email"
					className={`h-9 bg-transparent text-base border-[1px] rounded-md w-full ease-in-out duration-200 ${
						errors.password && "border-red-500"
					}`}
					{...register("email")}
				/>
				{errors.email && <ErroMessage>{errors.email.message}</ErroMessage>}
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor="text">CPF</Label>
				<Input
					placeholder="Insira seu cpf..."
					type="text"
					className={`h-9 bg-transparent text-base border-[1px] rounded-md w-full ease-in-out duration-200 focus:border-0 ${
						errors.cpf && "border-red-500"
					}`}
					{...register("cpf")}
				/>
				{errors.cpf && <ErroMessage>{errors.cpf.message}</ErroMessage>}
			</div>
			<div className="flex flex-col gap-1 col-span-2">
				<Label htmlFor="enterpriseSegment">Segmento da empresa</Label>
				<Input
					placeholder="Digite o segmento da sua empresa..."
					type="text"
					className={`h-9 bg-transparent text-base border-[1px] rounded-md w-full ease-in-out duration-200 ${
						errors.password && "border-red-500"
					}`}
					{...register("enterpriseSegment")}
				/>
				{errors.enterpriseSegment && (
					<ErroMessage>{errors.enterpriseSegment.message}</ErroMessage>
				)}
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor="password">Senha</Label>
				<Input
					placeholder="Senha"
					type="password"
					className={`h-9 bg-transparent text-base border-[1px] rounded-md w-full ease-in-out duration-200 focus:border-0 ${
						errors.password && "border-red-500"
					}`}
					{...register("password")}
				/>
				{errors.password && (
					<ErroMessage>{errors.password.message}</ErroMessage>
				)}
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor="confirmPassword">Confirme sua senha</Label>
				<Input
					placeholder="Insira sua senha..."
					type="password"
					className={`h-9 bg-transparent text-base border-[1px] rounded-md w-full ease-in-out duration-200 focus:border-0 ${
						errors.confirmPassword && "border-red-500"
					}`}
					{...register("confirmPassword")}
				/>
				{errors.confirmPassword && (
					<ErroMessage>{errors.confirmPassword.message}</ErroMessage>
				)}
			</div>
			<Button
				type="submit"
				className="text-white h-[42px] hover:bg-[#3a8b40] transition-colors duration-100 ease-linear font-semibold text-[20px] col-span-2"
			>
				{isLoading ? <Spinner>Registrando...</Spinner> : "Registrar"}
			</Button>
		</form>
	);
};

export default FormRegister;
