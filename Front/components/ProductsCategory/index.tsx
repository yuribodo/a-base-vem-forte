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

const ProdutosPorCategoria = () => {
  const data = {
    labels: [
      "Cereais",
      "Carnes",
      "Laticínios",
      "Frutas",
      "Verduras",
      "Bebidas",
      "Temperos",
      "Congelados",
      "Enlatados",
    ],
    datasets: [
      {
        label: "Quantidade de Produtos", 
        data: [12, 8, 15, 20, 18, 10, 7, 5, 9],
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
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false, 
      },
      title: {
        display: false, 
        text: "Produtos por Categoria",
      },
    },
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg font-bold">
      <Bar data={data} options={options} />
    </div>
  );
};

export default ProdutosPorCategoria;
