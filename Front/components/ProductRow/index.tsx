import React from 'react';
import { Clock, Package, Tag, AlertCircle } from 'lucide-react';
import useIsOpenModalStore from '@/store/OpenProductModal';

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

interface ProductRowProps {
  product: Product;
}

const getDaysLeftColor = (days: number): string => {
  if (days <= 7) return "bg-red-100 text-red-800";
  if (days <= 30) return "bg-yellow-100 text-yellow-800";
  return "bg-green-100 text-green-800";
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

const { setIsModalOpen } = useIsOpenModalStore();
const handleCloseModal = () => {
      setIsModalOpen(true);
}

const ProductRow: React.FC<ProductRowProps> = ({ product }) => {
  return (
    <div 
      onClick={() => handleCloseModal()}
      className="flex items-center gap-4 mt-4 bg-white p-4 rounded-lg shadow-xl border hover:shadow-md transition-shadow duration-300 cursor-pointer">
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
  );
};

export default ProductRow;