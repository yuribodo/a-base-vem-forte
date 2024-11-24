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
import useAuthContext from "@/hooks/useAuthContext";

const registerSchema = z
	.object({
		firstName: z
			.string()
			.min(3, "O campo nome deve ter pelo menos 3 caracteres")
			.max(100, "O campo nome deve ter no maximo 100 caracteres"),
		lastName: z
			.string()
			.min(3, "O campo nome deve ter pelo menos 3 caracteres")
			.max(100, "O campo nome deve ter no maximo 100 caracteres"),
		documentType: z.string().min(1, "O campo tipo de documento é obrigatório"),
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
		phoneNumber: z
			.string()
			.min(10, "O campo telefone deve ter pelo menos 10 caracteres"),
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
			firstName: "",
			phoneNumber: "",
			lastName: "",
			documentType: "",
			email: "",
			cpf: "",
			enterpriseSegment: "",
			password: "",
			confirmPassword: "",
		},
	});
	const isLoading = true;

	const { onHandleRegister } = useAuthContext();

	return (
		<form
			className="grid grid-cols-2 w-full gap-6"
			onSubmit={handleSubmit(onHandleRegister)}
		>
			<div className="flex flex-col gap-1">
				<Label htmlFor="firstName">Nome</Label>
				<Input
					placeholder="Insira seu nome..."
					type="text"
					className={`h-9 bg-transparent text-base border-[1px] rounded-md w-full ease-in-out duration-200 ${
						errors.firstName && "border-red-500"
					}`}
					{...register("firstName")}
				/>
				{errors.firstName && (
					<ErroMessage>{errors.firstName.message}</ErroMessage>
				)}
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor="lastName">Sobrenome</Label>
				<Input
					placeholder="Insira seu sobrenome..."
					type="text"
					className={`h-9 bg-transparent text-base border-[1px] rounded-md w-full ease-in-out duration-200 ${
						errors.lastName && "border-red-500"
					}`}
					{...register("lastName")}
				/>
				{errors.lastName && (
					<ErroMessage>{errors.lastName.message}</ErroMessage>
				)}
			</div>
			<div className="flex flex-col gap-1 col-span-2">
				<Label htmlFor="email">Email</Label>
				<Input
					placeholder="Insira seu email..."
					type="email"
					className={`h-9 bg-transparent text-base border-[1px] rounded-md w-full ease-in-out duration-200 ${
						errors.email && "border-red-500"
					}`}
					{...register("email")}
				/>
				{errors.email && <ErroMessage>{errors.email.message}</ErroMessage>}
			</div>
			<div className="flex flex-col gap-1 col-span-2">
				<Label htmlFor="phoneNumber">Número de telefone</Label>
				<Input
					placeholder="Insira seu número de telefoone (XX)XXXXXXXXX..."
					type="text"
					className={`h-9 bg-transparent text-base border-[1px] rounded-md w-full ease-in-out duration-200 ${
						errors.email && "border-red-500"
					}`}
					{...register("phoneNumber")}
				/>
				{errors.phoneNumber && (
					<ErroMessage>{errors.phoneNumber.message}</ErroMessage>
				)}
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor="documentType">Documento</Label>
				<select
					className={`h-9 bg-transparent text-base border-[1px] px-2 rounded-md w-full ease-in-out duration-200 ${
						errors.documentType && "border-red-500"
					}`}
					{...register("documentType")}
				>
					<option value="" disabled className="text-gray-400">
						Selecione o tipo de documento
					</option>
					<option value="CPF">CPF</option>
					<option value="CNPJ">CNPJ</option>
				</select>
				{errors.documentType && (
					<ErroMessage>{errors.documentType.message}</ErroMessage>
				)}
			</div>
			<div className="flex flex-col gap-1">
				<Label htmlFor="text">CPF/CNPJ</Label>
				<Input
					placeholder="Insira seu documento..."
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
						errors.enterpriseSegment && "border-red-500"
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
