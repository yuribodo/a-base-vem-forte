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
		<div className="fixed inset-0 z-20 flex justify-center items-center">

        <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleModal} 
        ></div>

        <section
            className="w-full max-w-[700px] bg-white text-black shadow-2xl rounded-lg flex flex-col p-6 transform scale-100 opacity-100 transition-all duration-300 ease-out"
        >

            <div className="w-full flex justify-between items-start mb-4">
            <div>
                <h2 className="text-xl font-bold text-gray-800">{mockProducts.name}</h2>
                <p className="text-lg text-gray-600">{`R$ ${mockProducts.quantity * mockProducts.price}`}</p>
            </div>
            <button
                onClick={toggleModal}
                className="text-gray-500 hover:text-gray-700"
            >
                <CircleX className="w-6 h-6" />
            </button>
            </div>


            <div className="flex justify-center items-center mb-6">
            <Image
                src={mockProducts.productIMG}
                alt={mockProducts.name}
                width={150}
                height={150}
                className="rounded-lg"
            />
            </div>

            <div className="w-full">
            <h3 className="text-lg font-medium text-gray-800 mb-3">Detalhes</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-6">
                <div className="flex flex-col">
                <p className="text-sm text-gray-600">Categoria:</p>
                <p className="text-sm text-gray-800">{mockProducts.category || "---"}</p>
                </div>
                <div className="flex flex-col">
                <p className="text-sm text-gray-600">Produto Perecível:</p>
                <p className="text-sm text-gray-800">{mockProducts.perecibleProduct}</p>
                </div>
                <div className="flex flex-col">
                <p className="text-sm text-gray-600">Data de Fabricação:</p>
                <p className="text-sm text-gray-800">{mockProducts.manufactoringDate || "---"}</p>
                </div>
                <div className="flex flex-col">
                <p className="text-sm text-gray-600">Data de Validade:</p>
                <p className="text-sm text-gray-800">{mockProducts.validateDate}</p>
                </div>
                <div className="flex flex-col">
                <p className="text-sm text-gray-600">Quantidade:</p>
                <p className="text-sm text-gray-800">{mockProducts.quantity}</p>
                </div>
                <div className="flex flex-col">
                <p className="text-sm text-gray-600">Preço:</p>
                <p className="text-sm text-gray-800">{`R$ ${mockProducts.price}`}</p>
                </div>
                <div className="flex flex-col">
                <p className="text-sm text-gray-600">Código do Produto:</p>
                <p className="text-sm text-gray-800">{mockProducts.productCode}</p>
                </div>
            </div>
            </div>


            <div className="w-full mt-6 flex justify-end items-center gap-8">
            <div className="flex flex-col items-center">
                <button className="bg-green-500 text-white p-3 rounded-full shadow hover:bg-green-600">
                <Recycle className="w-6 h-6" />
                </button>
                <p className="text-sm text-gray-600 mt-2">Reciclar</p>
            </div>
            <div className="flex flex-col items-center">
                <button className="bg-red-500 text-white p-3 rounded-full shadow hover:bg-red-600">
                <Trash className="w-6 h-6" />
                </button>
                <p className="text-sm text-gray-600 mt-2">Descartar</p>
            </div>
            </div>
        </section>
        </div>
  );
}
