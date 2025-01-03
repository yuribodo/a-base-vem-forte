'use client';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Label from '@/components/Label';
import React, { useEffect, useState } from 'react';
import Spinner from "../../../../../components/SpinnerLoading";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErroMessage from "../../../../../components/ErrorMessage";
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import useModalStore from '@/store/OpenProductModal';
import { getENCategoryByPTValue, PortugueseCategories, portugueseCategories } from '@/utils/portugueseProductCategories';
import { getDestinationKeyByValue, PortugueseDestination, portugueseDestination } from '@/utils/portugueseProductDestination';


const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

const loginSchema = z.object({
	name: z.string().min(1, "O campo é obrigatório"),
	description: z
		.string()
		.min(3, "A descrição precisa ter ao menos 6 caracteres")
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
		.refine(
			(date) => {
				if (!date) return true; 
				const [day, month, year] = date.split("/").map(Number);
				const dateObject = new Date(year, month - 1, day);
				const today = new Date();
				today.setHours(0, 0, 0, 0); 
				return dateObject <= today; 
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
	isPerishableProduct: z.string(), 
	category: z.string().toUpperCase(), 
});


type addProductTypes = z.infer<typeof loginSchema> & {
	category: string;
};

export default function Page() {
	
    const { selectedProductId  } = useModalStore();
    const [isProductLoaded, setIsProductLoaded] = useState<boolean>(false);
    const [product, setProduct] = useState<any>(null);

	

    function formatDateToDDMMYYYY(dateString: string): string {      
        const [year, month, day] = dateString.split("-");
        return `${day}/${month}/${year}`;
    }

    useEffect(() => {
        const fetchProducts = async() => {
            try {
                setIsProductLoaded(true);
                const response = await axios.get(`${apiUrl}/products/${selectedProductId}/`);
                setProduct({
                    ...response.data,
                    category: portugueseCategories[response.data.category as keyof PortugueseCategories],
                    destination: portugueseDestination[response.data.destination as keyof PortugueseDestination],
                });
            }
            catch (error) {
                console.error("Error fetching product:", error);
            }
        }

        if(selectedProductId) {
            fetchProducts();
        }
    }, [selectedProductId]);

    useEffect(() => {
        if(!product) return;

        reset({
            name: product?.name || "",
            description: product?.description || "",
            manufactoringDate: formatDateToDDMMYYYY(product?.date_of_manufacture) || "",
            validateDate: formatDateToDDMMYYYY(product?.expiration_date) ||"",
            price: product?.price || "",
            quantity: product?.quantity.toString() || "",
            productCode: product?.code_product ||"",
            isPerishableProduct: product?.is_perishable ? 'sim' : 'nao', 
            category: getENCategoryByPTValue(product?.category).toLocaleLowerCase()|| "",
        })

    }, [product])

	const {
		register,
		handleSubmit,
        reset,
		formState: { errors },
	} = useForm<addProductTypes>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			description: "",
			manufactoringDate:  "",
			validateDate: "",
			price: undefined,
			quantity: undefined,
			productCode: "",
			isPerishableProduct: 'nao', 
			category: "", 
		},
	});

	const convertDateToAPIFormat = (date: string): string => {
		if (!date) return '';
		const [day, month, year] = date.split("/").map(Number);
		return new Date(year, month - 1, day).toISOString().split('T')[0]; 
	};

	const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
	const router = useRouter();


	const handleProductSubmit = async (dados: addProductTypes) => {

		setIsLoading(true);

		const sanitizedData = {
			...dados,
			description: dados.description || undefined,
			manufactoringDate: dados.manufactoringDate ? convertDateToAPIFormat(dados.manufactoringDate) : undefined,
		
			expiration_date: convertDateToAPIFormat(dados.validateDate),
			date_of_manufacture: dados.manufactoringDate ? convertDateToAPIFormat(dados.manufactoringDate) : undefined,
			category: dados.category,  
			code_product: dados.productCode,
			is_perishable: dados.isPerishableProduct === "sim" ? true : false,
			destination: getDestinationKeyByValue(product.destination) || "SALE"
		};
		
		try {
			const response = await axios.put(`${apiUrl}/products/${selectedProductId}/`, sanitizedData);
			console.log("Product Editado:", response.data);
			toast.success('Produto editado com sucesso!');
            setError(null);

			setTimeout(() => {
				router.push('/produtos');
			}, 2000);
			
		} catch (error: any) {
			console.error("Error adding product:", error);
            setError("Erro ao carregador produto. Tente novamente.");
			if(error.response.data.code_product[0] === 'products with this code product already exists.') {
				toast.error('Já existe um produto com esse código.');
			}
			else {
				toast.error('Ocorreu um erro ao editar o produto.');
			}
		} finally {
			setIsLoading(false);
		}
	};

	
	return (
        <>
            <Toaster />
            {isLoading ? (
                <div className="text-center py-8 text-gray-500">
                Carregando produtos...
                </div>
            ) : error ? (
                <div className="text-center py-8 text-red-500">
                {error}
                </div>
            ) : (
                <main className="w-full h-full flex flex-col items-start py-8 px-6 lg:p-8 gap-6">
                <div className="w-full flex justify-start">
                    <h1 className="text-2xl font-bold">Editar Produto</h1>
                </div>
                <form
                    className="w-full flex flex-col gap-6 items-center"
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
                            <select 
                                {...register("category")} 
                                className="px-4 py-[7px] border rounded-md" 
                                >
                                <option value="cereals">Cereais</option>
                                <option value="meats">Carnes</option>
                                <option value="dairy products">Laticínios</option>
                                <option value="fruits">Frutas</option>
                                <option value="vegetables">Verduras</option>
                                <option value="drinks">Bebidas</option>
                                <option value="seasonings">Temperos</option>
                                <option value="frozens">Congelados</option>
                                <option value="canned goods">Enlatados</option>
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <Label htmlFor="isPerishableProduct">Produto Perecível</Label>
                            <select
                                
                                className="px-4 py-[7px] border rounded-md"
                                {...register("isPerishableProduct")}
                            >
                                <option value="nao">Não</option>
                                <option value="sim">Sim</option>
                            </select>
                            {errors.isPerishableProduct && (
                                <ErroMessage>{errors.isPerishableProduct.message}</ErroMessage>
                            )}
                        </div>
                        
                        <div>
                            <Label htmlFor="validateDate">Data de Fabricação</Label>
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
                                placeholder="Escreva a quantidade do produto"
                                {...register("quantity")}
                            />
                            {errors.quantity && <ErroMessage>{errors.quantity.message}</ErroMessage>}
                        </div>
                        <div>
                            <Label htmlFor="productCode">Código do Produto</Label>
                            <Input
                                type="text"
                                placeholder="Escreva o código do produto"
                                {...register("productCode")}
                            />
                            {errors.productCode && <ErroMessage>{errors.productCode.message}</ErroMessage>}
                        </div>
                    </div>

                    <Button type="submit" className='text-white font-medium w-full max-w-xl mt-5'>
                        {isLoading ? <Spinner /> : "Editar Produto"}
                    </Button>
                </form>
            </main>
            )}

        </>
	);
}
