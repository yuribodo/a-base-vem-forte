'use client'

import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar/index'
import { Clock, Package, DollarSign, Tag, AlertCircle, Search, Plus } from 'lucide-react';
import Link from 'next/link';
import ProductModal from '../../../../components/ProductModal/index';

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

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = mockedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="w-full  relative">
      <section className="w-full p-8">
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Produtos</h1>
            <Link
              href="/main/produtos/adicionar-produto"
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
            {filteredProducts.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum produto encontrado
              </div>
            ) : (
              filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
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
      </section>
      
      {/* Div que controla o overlay e exposição do ProductModal  */}
      <div className="w-full h-full flex justify-center items-center absolute top-0 bg-[#9292928e] mx-auto z-20">
        <ProductModal/>
      </div>
    </main>
  );
};

export default Page;