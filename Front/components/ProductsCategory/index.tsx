import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

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

interface ProdutosPorCategoriaProps {
  products: Product[];
}

const categoryTranslations: Record<string, string> = {
  CEREALS: "Cereais",
  MEAT: "Carnes",
  DAIRY: "Laticínios",
  FRUITS: "Frutas",
  VEGETABLES: "Verduras",
  DRINKS: "Bebidas",
  SEASONINGS: "Temperos",
  FROZEN: "Congelados",
  CANNED: "Enlatados",
};

const ProdutosPorCategoria: React.FC<ProdutosPorCategoriaProps> = ({ products }) => {
  const calculateCategoryQuantities = () => {
    const categoryCounts = products.reduce((acc, product) => {
      acc[product.category] = (acc[product.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const categories = Object.keys(categoryCounts);
    const quantities = Object.values(categoryCounts);

    return {
      categories: categories.map(cat => categoryTranslations[cat] || cat),
      quantities,
    };
  };

  const { categories, quantities } = calculateCategoryQuantities();

  const data = {
    labels: categories,
    datasets: [
      {
        label: "Quantidade de Produtos",
        data: quantities,
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF6B6B",
          "#51C4D3",
          "#D3A3A3",
        ],
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Produtos por Categoria",
      },
      tooltip: {
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.raw} produtos`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        },
      },
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      }
    },
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg font-bold">
      {products.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          Nenhum produto encontrado
        </div>
      ) : (
        <div className="h-[300px] max-w-2xl mx-auto">
          <Bar data={data} options={options} />
        </div>
      )}
    </div>
  );
};

export default ProdutosPorCategoria;