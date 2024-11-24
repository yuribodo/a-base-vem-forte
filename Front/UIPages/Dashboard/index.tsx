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
          {mockedProducts.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Nenhum produto encontrado
            </div>
          ) : (
            mockedProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))
          )}
        </div>
      </div>


      <div className="hidden md:flex md:flex-row items-start w-full gap-4">
        <div className="bg-white shadow-xl w-full md:w-3/4 lg:w-2/3 rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Últimos Produtos Cadastrados</h2>
          {mockedProducts.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              Nenhum produto encontrado
            </div>
          ) : (
            mockedProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
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
        <ProdutosPorCategoria />
      </div>
    </main>
  );
};

export default DashboardPage;