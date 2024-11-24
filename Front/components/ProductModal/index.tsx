import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CircleX, Recycle, Trash } from "lucide-react";
import useModalStore from "../../store/OpenProductModal";
import productImage from "@/assets/product-image.jpg";

export default function ProductModal() {
  const { isOpenModal, selectedProductId, setIsOpenModal } = useModalStore();
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    if (selectedProductId) {
      fetch(`http://127.0.0.1:8000/api/products/${selectedProductId}/`)
        .then((response) => response.json())
        .then((data) => setProduct(data))
        .catch((error) => console.error(error));
    }
  }, [selectedProductId]);

  const toggleModal = () => {
    setIsOpenModal(!isOpenModal);
  };

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-20 flex justify-center items-center">
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={toggleModal}
      ></div>

      <section className="w-full max-w-[700px] bg-white text-black shadow-2xl rounded-lg flex flex-col p-6 transform scale-100 opacity-100 transition-all duration-300 ease-out">
        <div className="w-full flex justify-between items-start mb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{product.name}</h2>
            <p className="text-lg text-gray-600">{`R$ ${product.price * product.quantity}`}</p>
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
            src={product.image || productImage}
            alt={product.name}
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
              <p className="text-sm text-gray-800">{product.category || "---"}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">Produto Perecível:</p>
              <p className="text-sm text-gray-800">{product.is_perishable ? "Sim" : "Não"}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">Data de Fabricação:</p>
              <p className="text-sm text-gray-800">{product.date_of_manufacture || "---"}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">Data de Validade:</p>
              <p className="text-sm text-gray-800">{product.expiration_date}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">Quantidade:</p>
              <p className="text-sm text-gray-800">{product.quantity}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">Preço:</p>
              <p className="text-sm text-gray-800">{`R$ ${product.price}`}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">Código do Produto:</p>
              <p className="text-sm text-gray-800">{product.code_product}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-sm text-gray-600">Destino:</p>
              <p className="text-sm text-gray-800">{product.destination || "---"}</p>
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
