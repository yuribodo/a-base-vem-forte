'use client';

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import ProdutosPorCategoria from "@/components/ProductsCategory";
import ProductRow from "@/components/ProductRow";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Product {
    id: number;
    image: string;
    name: string;
    category: string;
    expirationDate: string;
    daysLeft: number;
    quantity: number;
    price: string;
    is_perishable: boolean;
  }
  
  const mockedProducts: Product[] = [
    {
      id: 1,
      image: 'https://via.placeholder.com/100',
      category: 'bla',
      name: 'Produto A',
      expirationDate: '2024-12-15',
      daysLeft: 22,
      quantity: 10,
      price: '20,00',
      is_perishable: true,
    },
    {
      id: 2,
      image: 'https://via.placeholder.com/100',
      category: 'bla',
      name: 'Produto B',
      expirationDate: '2024-11-30',
      daysLeft: 7,
      quantity: 5,
      price: '50,00',
      is_perishable: true,
    },
    {
      id: 3,
      image: 'https://via.placeholder.com/100',
      name: 'Produto C',
      category: 'bla',
      expirationDate: '2024-12-25',
      daysLeft: 32,
      quantity: 20,
      price: '15,00',
      is_perishable: true,
    },
  ];


const DashboardPage = () => {
  const chartData = {
    labels: ["Válidos", "Quase vencendo", "Vencidos"],
    datasets: [
      {
        data: [70, 20, 10],
        backgroundColor: ["#4caf50", "#ffeb3b", "#f44336"],
        hoverBackgroundColor: ["#45a049", "#fdd835", "#e53935"],
      },
    ],
  };

  

  return (
    <main className="w-full p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex flex-col  items-center w-full ">
            <div className="bg-white shadow-xl w-full rounded-lg p-6">
                <h2 className="text-lg font-bold mb-4">Últimos Produtos Cadastrados</h2>
                    {mockedProducts.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                        Nenhum produto encontrado
                        </div>
                    ) : (
                        mockedProducts.map((product) => (
                          <ProductRow key={product.id} product={product} />
                        ))
                    )}
            </div>

            <div className=" bg-white shadow-md rounded-lg p-6 flex flex-col w-1/5 md:w-1/5 mt-4 md:mt-0">
                <h2 className="text-lg font-bold mb-4">Controle de Validade</h2>
                <div className="w-2/3">
                    <Pie data={chartData} />
                </div>
            </div>
        </div>
        

        <div className="p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-lg font-bold mb-4">Produtos por Categoria</h2>
            <ProdutosPorCategoria/>
        </div>
  

    </main>
  );
};

export default DashboardPage;
