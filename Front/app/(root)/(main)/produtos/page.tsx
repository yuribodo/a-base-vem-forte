'use client'

import React, { useState } from 'react';
import SearchBar from '@/components/SearchBar/index'
import { Clock, Package, Tag, AlertCircle, Plus } from 'lucide-react';
import Link from 'next/link';
import ProductRow from '@/components/ProductRow';

interface Product {
  id: number;
  image: string;
  name: string;
  category: string;
  is_perishable: boolean;
  expirationDate: string;
  daysLeft: number;
  quantity: number;
  price: string;
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

const Page = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = mockedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="w-full p-8">
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
          {filteredProducts.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              Nenhum produto encontrado
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default Page;