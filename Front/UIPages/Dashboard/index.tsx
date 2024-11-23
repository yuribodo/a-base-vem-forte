'use client';

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Clock, Package, Tag, AlertCircle } from 'lucide-react';
import { Pie } from "react-chartjs-2";
import ProdutosPorCategoria from "@/components/ProductsCategory";

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

  const getDaysLeftColor = (days: number): string => {
    if (days <= 7) return "bg-red-100 text-red-800";
    if (days <= 30) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };
  
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

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
    <main className="w-[calc(100vw-16rem)] p-8 space-y-8 ">
        <h1 className="text-2xl font-bold">DashBoard</h1>
        <div className="flex  items-center w-full max-w-4xl mx-auto">
            <div className="bg-white shadow-xl rounded-lg p-6 w-full">
                <h2 className="text-lg font-bold mb-4">Últimos Produtos Cadastrados</h2>
                <div className="space-y-2">
                    {mockedProducts.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                        Nenhum produto encontrado
                        </div>
                    ) : (
                        mockedProducts.map((product) => (
                        <div 
                            key={product.id}
                            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-xl hover:shadow-md transition-shadow duration-300 cursor-pointer"
                        >
                            <img 
                            src="/api/placeholder/80/80"
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                            />
                            
                            <div className="flex-1">
                            <h2 className="font-medium text-gray-900">{product.name}</h2>
                                <div className="flex items-center gap-2 mt-1">
                                    <Tag className="w-3 h-3 text-gray-400" />
                                    <span className="text-xs text-gray-500">{product.category}</span>
                                    {product.is_perishable && (
                                    <div className="flex items-center gap-1 text-amber-600">
                                        <AlertCircle className="w-3 h-3" />
                                        <span className="text-xs">Perecível</span>
                                    </div>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col items-start gap-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4" />
                                <span>{formatDate(product.expirationDate)}</span>
                            </div>
                                <span className={`px-2 py-1 rounded-full text-xs ${getDaysLeftColor(product.daysLeft)}`}>
                                    {product.daysLeft} dias restantes
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-gray-600 w-24">
                                <Package className="w-4 h-4" />
                                <span>{product.quantity} un</span>
                            </div>

                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 w-24">
                                <span>R$ {product.price}</span>
                            </div>
                        </div>
                        ))
                    )}
                    </div>
            </div>

            <div className=" bg-white shadow-md rounded-lg p-6 flex flex-col w-1/5">
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
