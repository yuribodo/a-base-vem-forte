"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import SearchBar from "@/components/SearchBar/index";
import { Plus } from "lucide-react";
import Link from "next/link";
import ProductRow from "@/components/ProductRow";
import ProductModal from "@/components/ProductModal";
import useModalStore from "@/store/OpenProductModal";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  expiration_date: string;
  quantity: number;
  code_product: string;
  destination: string;
  is_perishable: boolean;
  date_of_manufacture: string;
}

const Page = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isOpenModal } = useModalStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Product[]>('http://127.0.0.1:8000/api/products/'); 
        setProducts(response.data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar produtos. Por favor, tente novamente mais tarde.');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate days left until expiration for each product
  const calculateDaysLeft = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <main className="w-full p-8">
      {isOpenModal && <ProductModal />}
      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">Produtos</h1>
          <Link
            href="/produtos/adicionar-produto"
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5ccb5f] text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium text-sm"
          >
            <Plus className="w-4 h-4" />
            Adicionar Produto
          </Link>
        </div>

        <SearchBar
          value={searchTerm}
          onChange={setSearchTerm}
          placeholder="Buscar produtos..."
        />

        <div className="space-y-2">
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">
              Carregando produtos...
            </div>
          ) : error ? (
            <div className="text-center py-8 text-red-500">
              {error}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum produto encontrado
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductRow
                key={product.id}
                product={{
                  ...product,
                  daysLeft: calculateDaysLeft(product.expiration_date),
                  // Using a placeholder image since the API data doesn't include images
                  image: "https://via.placeholder.com/100"
                }}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;