'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import React from 'react';
import Spinner from "../../../../../components/SpinnerLoading";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErroMessage from "../../../../../components/ErrorMessage";

// Validação de data com regex para formato DD/MM/YYYY
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const loginSchema = z.object({
	name: z.string().min(1, "O campo é obrigatório"),
	description: z
		.string()
		.min(6, "A descrição precisa ter ao menos 6 caracteres")
		.optional()
		.or(z.literal('')),
	validateDate: z
		.string()
		.regex(dateRegex, "Formato de data inválido (use DD/MM/YYYY)")
		.refine(
			(date) => {
				const [day, month, year] = date.split("/").map(Number);
				const dateObject = new Date(year, month - 1, day);
				return dateObject > new Date();
			},
			{ message: "A data de validade deve ser no futuro" }
		),
	manufactoringDate: z
		.string()
		.regex(dateRegex, "Formato de data inválido (use DD/MM/YYYY)")
		.optional()
		.or(z.literal(''))
		.refine(
			(date) => {
				if (!date) return true; // Aceitar valor vazio, já que é opcional
				const [day, month, year] = date.split("/").map(Number);
				const dateObject = new Date(year, month - 1, day);
				const today = new Date();
				today.setHours(0, 0, 0, 0); // Ajustar para meia-noite
				return dateObject <= today; // Validação de passado ou presente
			},
			{ message: "A data de fabricação deve ser no passado ou no dia atual" }
		),
	price: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val), { message: "O preço deve ser um número" })
		.refine((val) => val >= 1, {
			message: "O preço é obrigatório e deve ser pelo menos 1",
		}),
	quantity: z
		.string()
		.transform((val) => Number(val))
		.refine((val) => !isNaN(val), { message: "A quantidade deve ser um número" })
		.refine((val) => val >= 1, {
			message: "A quantidade é obrigatória e deve ser pelo menos 1",
		}),
	productCode: z
		.string()
		.min(6, "O código do produto precisa ter ao menos 6 caracteres"),
});

type loginTypes = z.infer<typeof loginSchema>;

export default function Page() {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
	} = useForm<loginTypes>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			description: undefined,
			manufactoringDate: undefined,
			validateDate: "",
			price: undefined,
			quantity: undefined,
			productCode: "",
		},
	});
	let isLoading = false;

	const handleProductSubmit = (dados: loginTypes) => {

        isLoading = true;

		const sanitizedData = {
			...dados,
			description: dados.description || undefined, 
			manufactoringDate: dados.manufactoringDate || undefined, 
		};
		console.log(sanitizedData);
		console.log(dados);
	};

	return (
		<main className="w-full h-full flex flex-col items-start p-8 gap-6">
			<div className="w-full flex justify-start">
				<h1 className="text-2xl font-bold">Adicionar Produto</h1>
			</div>
			<form
				className="w-full flex flex-col gap-6"
				onSubmit={handleSubmit(handleProductSubmit)}
			>
				<div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
					<div>
						<Label htmlFor="name">Nome</Label>
						<Input
							type="text"
							placeholder="Nome do produto"
							{...register("name")}
						/>
						{errors.name && <ErroMessage>{errors.name.message}</ErroMessage>}
					</div>
					<div>
						<Label htmlFor="description">Descrição (opcional)</Label>
						<Input
							type="text"
							placeholder="Escreva a descrição do produto"
							{...register("description")}
						/>
						{errors.description && <ErroMessage>{errors.description.message}</ErroMessage>}
					</div>
					<div className="flex flex-col">
						<Label htmlFor="category">Categoria</Label>
						<select name="category" className="px-4 py-[7px] border rounded-md">
							<option value="cereais">Cereais</option>
							<option value="carnes">Carnes</option>
							<option value="laticinios">Laticínios</option>
							<option value="frutas">Frutas</option>
							<option value="verduras">Verduras</option>
							<option value="bebidas">Bebidas</option>
							<option value="temperos">Temperos</option>
							<option value="congelados">Congelados</option>
							<option value="enlatados">Enlatados</option>
						</select>
					</div>
					<div className="flex flex-col">
						<Label htmlFor="perecibleProduct">Produto Perecível</Label>
						<select name="perecibleProduct" className="px-4 py-[7px] border rounded-md">
							<option value="nao">Não</option>
							<option value="sim">Sim</option>
						</select>
					</div>
					
					<div>
						<Label htmlFor="validateDate">Data de Fabricação (opcional)</Label>
						<Input
							type="text"
							placeholder="DD/MM/YYYY"
							{...register("manufactoringDate")}
						/>
						{errors.manufactoringDate && (
							<ErroMessage>{errors.manufactoringDate.message}</ErroMessage>
						)}
					</div>
					<div>
						<Label htmlFor="validateDate">Data de Validade</Label>
						<Input
							type="text"
							placeholder="DD/MM/YYYY"
							{...register("validateDate")}
						/>
						{errors.validateDate && (
							<ErroMessage>{errors.validateDate.message}</ErroMessage>
						)}
					</div>
					<div>
						<Label htmlFor="price">Preço</Label>
						<Input
							type="text"
							placeholder="Escreva o preço do produto"
							{...register("price")}
						/>
						{errors.price && <ErroMessage>{errors.price.message}</ErroMessage>}
					</div>
					<div>
						<Label htmlFor="quantity">Quantidade</Label>
						<Input
							type="text"
							placeholder="Quantidade do produto"
							{...register("quantity")}
						/>
						{errors.quantity && <ErroMessage>{errors.quantity.message}</ErroMessage>}
					</div>
					<div>
						<Label htmlFor="productCode">Código do Produto</Label>
						<Input
							type="text"
							placeholder="Código do produto"
							{...register("productCode")}
						/>
						{errors.productCode && (
							<ErroMessage>{errors.productCode.message}</ErroMessage>
						)}
					</div>
				</div>

				<div className="w-full flex justify-start items-center">
					<Button
						type="submit"
						className="w-full sm:w-1/2 lg:w-1/3 max-w-[400px] bg-[#3a8b40] text-white h-[42px] hover:bg-[#3a8b40] transition-colors duration-100 ease-linear font-semibold text-[20px]"
					>
						{isLoading ? <Spinner>Cadastrando...</Spinner> : "Cadastrar"}
					</Button>
				</div>
			</form>
		</main>
	);
}
