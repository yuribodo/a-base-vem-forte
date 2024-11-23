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
	description: z.string().min(6, "A descrição precisa ter ao menos 6 caracteres"),
	validateDate: z
		.string()
		.regex(dateRegex, "Formato de data inválido (use DD/MM/YYYY)"),
	price: z
        .string()
        .transform((val) => Number(val)).refine((val) => !isNaN(val), { message: "O preço deve ser um número", }) 
        .refine((val) => val >= 1, { message: "O preço é obrigatório e deve ser pelo menos 1", }),
	quantity: z
        .string()
        .transform((val) => Number(val)).refine((val) => !isNaN(val), { message: "O preço deve ser um número", })
        .refine((val) => val >= 1, { message: "A quantidade é obrigatório e deve ser pelo menos 1", }),
	productCode: z.string().min(6, "O código do produto precisa ter ao menos 6 caracteres"),
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
			description: "",
			validateDate: "",
			price: 0,
			quantity: 0,
			productCode: "",
		},
	});
	let isLoading = false;

	const handleSubmitLogin = (dados: loginTypes) => {
        isLoading = true;
		console.log(dados);
	};

	return (
		<main className="w-[calc(100vw-16rem)] h-full flex justify-center items-center pt-10 px-20">
			<section className="w-full max-w-2xl h-full p-10 rounded-md shadow-xl">
				<form
					className="flex flex-col gap-6"
					onSubmit={handleSubmit(handleSubmitLogin)}
				>
					<div className="w-full grid grid-cols-1 xl:grid-cols-2 gap-6">
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
							<Label htmlFor="description">Descrição</Label>
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

					<div className="w-full flex justify-center items-center">
						<Button
							type="submit"
							className="w-1/2 text-white h-[42px] hover:bg-[#3a8b40] transition-colors duration-100 ease-linear font-semibold text-[20px]"
						>
							{isLoading ? <Spinner>Cadastrando...</Spinner> : "Cadastrar"}
						</Button>
					</div>
				</form>
			</section>
		</main>
	);
}
