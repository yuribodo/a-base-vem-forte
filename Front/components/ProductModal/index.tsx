import Image from "next/image";
import React from "react";
import { CircleX, Recycle, Trash } from "lucide-react";
import useModalStore from "../../store/OpenProductModal";
import productImage from '@/assets/product-image.jpg'

const mockProducts = {
	id: 1,
	name: "Product 1",
	description: "Description 1 do produto 1",
	category: "Cereais",
	perecibleProduct: "Não",
	manufactoringDate: "12/05/2024",
	validateDate: "12/12/2024",
	quantity: 5,
	price: 10,
	productCode: "55FRT",
	productIMG: productImage,
};

export default function ProductModal() {
	const { setIsOpenModal, isOpenModal } = useModalStore();
	const toggleModal = () => {
		setIsOpenModal(!isOpenModal);
	};

	return (
		<div className="w-full h-full justify-center items-center absolute top-0 bg-[#9292928e] mx-auto z-20">
			<section className="w-full sm:w-[400px] lg:w-[700px] bg-[#eeeeee]  text-black shadow-xl font-semibold rounded-md flex flex-col justify-center items-center p-6 z-50">
				<div className="w-full flex justify-between gap-5">
					<div className="flex flex-col">
						<h2 className="sm:text-2xl">{mockProducts.name}</h2>
						<p>{`R$ ${mockProducts.quantity * mockProducts.price}`}</p>
					</div>
					<button onClick={() => toggleModal()}>
						<CircleX className="mb-5 text-black cursor-pointer" />
					</button>
				</div>
				<Image
					src={mockProducts.productIMG}
					alt={mockProducts.name}
					width={100}
					height={100}
				/>

				<div className="w-full py-3 flex flex-col justify-start items-start">
					<p className="">Detalhes</p>
					<div className="w-full pt-2 grid grid-cols-2 items-start">
						<div>
							<div className="flex gap-3">
								<p className="text-slate-600">Categoria: </p>
								<p>{mockProducts.category || "---"}</p>
							</div>
							<div className="flex gap-3">
								<p className="text-slate-600">Produto Perecível: </p>
								<p>{mockProducts.perecibleProduct}</p>
							</div>
						</div>
						<div>
							<div className="flex gap-3">
								<p className="text-slate-600">Data de Fabricação: </p>
								<p>{mockProducts.manufactoringDate || "---"}</p>
							</div>
							<div className="flex gap-3">
								<p className="text-slate-600">Data de Validade: </p>
								<p>{mockProducts.validateDate}</p>
							</div>
						</div>
						<div className="flex gap-3">
							<p className="text-slate-600">Quantidade: </p>
							<p>{mockProducts.quantity}</p>
						</div>
						<div className="flex gap-3">
							<p className="text-slate-600">Preço: </p>
							<p>{`R$ ${mockProducts.price}`}</p>
						</div>
						<div className="flex gap-3">
							<p className="text-slate-600">Código do Produto: </p>
							<p>{mockProducts.productCode}</p>
						</div>
					</div>
				</div>

				<div className="w-full pt-5 pb-2 flex justify-end items-center gap-8 text-white">
					<div className="flex flex-col justify-center items-center">
						<button className="bg-slate-500 p-2 rounded-full">
							<Recycle />
						</button>
						<p className="text-slate-500">Reciclar</p>
					</div>
					<div className="flex flex-col justify-center items-center">
						<button className="bg-slate-500 p-2 rounded-full">
							<Trash />
						</button>
						<p className="text-slate-500">Descartar</p>
					</div>
				</div>
			</section>
		</div>
	);
}
