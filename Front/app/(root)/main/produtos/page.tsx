import React from 'react';
import { Clock, Package, DollarSign } from 'lucide-react';

interface Product {
  id: number;
  image: string;
  name: string;
  expirationDate: string;
  daysLeft: number;
  quantity: number;
  price: string;
}

const mockedProducts: Product[] = [
  {
    id: 1,
    image: 'https://via.placeholder.com/100',
    name: 'Produto A',
    expirationDate: '2024-12-15',
    daysLeft: 22,
    quantity: 10,
    price: 'R$ 20,00',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/100',
    name: 'Produto B',
    expirationDate: '2024-11-30',
    daysLeft: 7,
    quantity: 5,
    price: 'R$ 50,00',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/100',
    name: 'Produto C',
    expirationDate: '2024-12-25',
    daysLeft: 32,
    quantity: 20,
    price: 'R$ 15,00',
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
  return (
    <main className="w-full p-8">
      <h1 className="text-2xl font-bold mb-6">Produtos</h1>
      
      <div className="space-y-2">
        {mockedProducts.map((product) => (
          <div 
            key={product.id}
            className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <img 
              src="/api/placeholder/80/80"
              alt={product.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            
            <div className="flex-1">
              <h2 className="font-medium text-gray-900">{product.name}</h2>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock className="w-4 h-4" />
              <span>{formatDate(product.expirationDate)}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${getDaysLeftColor(product.daysLeft)}`}>
                {product.daysLeft}d
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 w-32">
              <Package className="w-4 h-4" />
              <span>{product.quantity} un</span>
            </div>

            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 w-24">
              <DollarSign className="w-4 h-4" />
              <span>{product.price}</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Page;