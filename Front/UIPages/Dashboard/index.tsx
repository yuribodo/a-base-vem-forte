'use client';

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ProdutosPorCategoria from "@/components/ProductsCategory";
import ProductRow from "@/components/ProductRow";

ChartJS.register(ArcElement, Tooltip, Legend);

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

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
  recycle: boolean;
  discard: boolean;
}

const DashboardPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get<Product[]>(`${apiUrl}/api/products/`);
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

  const calculateDaysLeft = (expirationDate: string) => {
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const calculateExpirationStatus = (products: Product[]) => {
    const today = new Date();
    let valid = 0;
    let nearExpiration = 0;
    let expired = 0;
  
    products.forEach(product => {
      const daysLeft = calculateDaysLeft(product.expiration_date);
      
      if (daysLeft <= 0) {
        expired++;
      } else if (daysLeft <= 30) {  
        nearExpiration++;
      } else {
        valid++;
      }
    });
  
  
    return {
      valid,
      nearExpiration,
      expired
    };
  };
  
  const getChartData = () => {
    const status = calculateExpirationStatus(products);
    const total = status.valid + status.nearExpiration + status.expired;
    
    return {
      labels: ["Válidos", "Quase vencendo", "Vencidos"],
      datasets: [
        {
          data: [
            total > 0 ? (status.valid / total) * 10 : 0,
            total > 0 ? (status.nearExpiration / total) * 10 : 0,
            total > 0 ? (status.expired / total) * 10 : 0
          ],
          backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
          hoverBackgroundColor: ["#45a049", "#fdd835", "#e53935"],
        },
      ],
    };
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center text-gray-500">Carregando dados...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-center text-red-500">{error}</div>
      </div>
    );
  }

  const chartData = getChartData();

  return (
    <main className="w-full p-8 md:p-8 max-w-full overflow-x-hidden">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex flex-col md:hidden gap-4">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Controle de Validade</h2>
          <div className="w-full max-w-[200px] mx-auto">
            <Pie data={chartData} />
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-4">
            {chartData.labels.map((label, index) => (
              <div key={label} className="flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2"
                  style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] }}
                />
                <span className="text-sm">
                  {label} ({chartData.datasets[0].data[index]}%)
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Últimos Produtos Cadastrados</h2>
          {products.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Nenhum produto encontrado
            </div>
          ) : (
            products.slice(0, 3).map((product) => (
              <ProductRow key={product.id} product={{
                ...product,
                daysLeft: calculateDaysLeft(product.expiration_date),
                image: "https://via.placeholder.com/100"
              }} />
            ))
          )}
        </div>
      </div>

      <div className="hidden md:flex md:flex-row items-start w-full gap-4">
        <div className="bg-white shadow-xl w-full md:w-3/4 lg:w-2/3 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Últimos Produtos Cadastrados</h2>
          {products.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Nenhum produto encontrado
            </div>
          ) : (
            products.slice(0, 3).map((product) => (
              <ProductRow key={product.id} product={{
                ...product,
                daysLeft: calculateDaysLeft(product.expiration_date),
                image: "https://via.placeholder.com/100"
              }} />
            ))
          )}
        </div>

        <div className="bg-white shadow-md rounded-lg p-4 flex flex-col w-full md:w-1/4 lg:w-1/5">
          <h2 className="text-lg font-bold mb-2">Controle de Validade</h2>
          <div className="w-20 md:w-28 lg:w-24 mx-auto">
            <Pie data={chartData} />
          </div>
        </div>
      </div>

      <div className="p-4 bg-white shadow-lg rounded-lg mt-4 w-full md:w-3/4 lg:w-2/3 mx-auto">
        <h2 className="text-lg font-bold mb-2">Produtos por Categoria</h2>
        <ProdutosPorCategoria products={products} />
      </div>
    </main>
  );
};

export default DashboardPage;