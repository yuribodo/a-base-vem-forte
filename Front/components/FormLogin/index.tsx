"use client";

import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import Spinner from "../SpinnerLoading";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErroMessage from "../ErrorMessage";
import Label from "../Label";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";


const loginSchema = z.object({
	email: z
		.string()
		.trim()
		.min(1, "O campo email é obrigatório")
		.email("O email não é válido, insira um email válido"),
	password: z
		.string()
		.trim()
		.min(6, "A sua senha deve ter no mínimo 6 caracteres"),
});



type loginTypes = z.infer<typeof loginSchema>;

const FormLogin = () => {

	const router = useRouter()
	const {onHandleLogin} = useAuthContext()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<loginTypes>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
		defaultValues: { email: "", password: "" },
	});

	const handleSubmitLogin = async (dados: loginTypes) => {
		try {
			onHandleLogin(dados)
			await new Promise(resolve => {
				setTimeout(() => {
					resolve(true);
				}, 1000);
			})
			router.push('/dashboard')
		} catch (error) {
			
		}
		console.log("Dados enviados:", dados);
	};
	
	const isLoading = false;
	return (
		<form
			className="flex flex-col w-full gap-6"
			onSubmit={handleSubmit(handleSubmitLogin)}
		>
			<div className="flex flex-col gap-1">
				<Label htmlFor="email">Email</Label>
				<Input
					{...register("email")}
					placeholder="Email"
					type="email"
					className={`h-9 bg-transparent text-base border-[1px] rounded-md w-full ease-in-out duration-200 ${
						errors.email && "border-red-500"
					}`}
				/>
				{errors.email && <ErroMessage>{errors.email.message}</ErroMessage>}
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
			<Button
				type="submit"
				className="text-white h-[42px] hover:bg-[#3a8b40] transition-colors duration-100 ease-linear font-semibold text-[20px]"
			>
				{isLoading ? <Spinner>Entrando...</Spinner> : "Entrar"}
			</Button>
		</form>
	);
};

export default FormLogin;
