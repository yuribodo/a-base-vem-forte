import { useEffect, useState } from "react";
import axios from "axios";
import { formattedPrice } from "@/utils/formattedPrice";
import TableRow from "../TableRow";
import { formattedDate } from "@/utils/formattedDate";
import { daysLeft } from "@/utils/daysLeft";
import {
	calculateDonatedProductsValue,
	calculateTotalValue,
	calculateTrashProductsValue,
	countDonatedProducts,
	filterProductsByTab,
} from "@/utils/filters";

export interface Product {
	id: number;
	name: string;
	description: string;
	category: string;
	price: number;
	expiration_date: string;
	quantity: number;
	code_product: string;
	destination: string;
	is_perishable: boolean;
	date_of_manufacture: string;
  }

const TableProducts = ({ tab }: { tab: "expired" | "aboutToExpire" }) => {
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				const response = await axios.get("http://127.0.0.1:8000/api/products/"); 
				setProducts(response.data);
			} catch (err) {
				setError("Erro ao carregar os produtos. Tente novamente.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, []);

	const filteredProducts = filterProductsByTab(products, tab);
	const totalValue = calculateTotalValue(products);
	const donatedProductsCount = countDonatedProducts(filteredProducts);
	const valueDonatedProducts = calculateDonatedProductsValue(products);
	const valueTrashProducts = calculateTrashProductsValue(products);

	if (loading) {
		return <p>Carregando produtos...</p>;
	}

	if (error) {
		return <p>{error}</p>;
	}

	return (
		<div className="max-h-[600px] xl:max-w-[90%] md:w-full overflow-y-auto overflow-x-auto bg-white shadow-lg border-t-[1px] rounded-lg">
			<div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700 p-4">
				<p>Total de produtos: {filteredProducts.length}</p>
				<p>Preço total perdido: {formattedPrice(valueTrashProducts)}</p>
				{tab === "aboutToExpire" && (
					<>
						<p>
							Quantidade de produtos que foram doados: {donatedProductsCount}
						</p>
						<p>
							Valor total de produtos doados:{" "}
							{formattedPrice(valueDonatedProducts)}
						</p>
					</>
				)}
			</div>
			<table className="table-auto w-full text-left border-collapse">
				<thead>
					<tr className="text-gray-600 text-xs sm:text-sm font-semibold">
						<th className="px-2 sm:px-4 py-2 border-b border-gray-200">Nome</th>
						<th className="hidden sm:table-cell px-2 sm:px-4 py-2 border-b border-gray-200">
							Descrição
						</th>
						<th className="px-2 sm:px-4 py-2 border-b border-gray-200">
							Categoria
						</th>
						<th className="px-2 sm:px-4 py-2 border-b border-gray-200">
							Preço
						</th>
						<th className="px-2 sm:px-4 py-2 border-b border-gray-200">
							Quantidade
						</th>
						<th className="px-2 sm:px-4 py-2 border-b border-gray-200">Code</th>
						<th className="hidden md:table-cell px-2 sm:px-4 py-2 border-b border-gray-200">
							Destino
						</th>
						<th className="hidden lg:table-cell px-2 sm:px-4 py-2 border-b border-gray-200">
							Validade
						</th>
						{tab === "aboutToExpire" && (
							<th className="px-2 sm:px-4 py-2 border-b border-gray-200">
								Dias
							</th>
						)}
					</tr>
				</thead>
				<tbody>
					{filteredProducts.map((product, index) => (
						<TableRow
							key={index}
							productName={product.name}
							productDescription={product.description}
							productCategory={product.category}
							productPrice={product.price}
							productDestiny={product.destination}
							productQuantity={product.quantity}
							productCode={product.code_product}
							productValidity={formattedDate(product.expiration_date)}
							tempoRestante={daysLeft(product)}
							tab={tab}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableProducts;
