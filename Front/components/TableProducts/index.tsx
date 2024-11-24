import { formattedPrice } from "@/utils/formattedPrice";
import TableRow from "../TableRow";
import { formattedDate } from "@/utils/formattedDate";
import { daysLeft } from "@/utils/daysLeft";
import {
	calculateDonatedProductsValue,
	calculateTotalValue,
	countDonatedProducts,
	filterProductsByTab,
} from "@/utils/filters";
const mockedProducts = [
	{
		nome: "Produto 1",
		descricao: "Descrição detalhada do produto 1",
		categoria: "Categoria A",
		preco: 25.99,
		quantidade: 10,
		codeProduct: "001",
		destino: "Destino X",
		validade: "2021-08-10",
	},
	{
		nome: "Produto 2",
		descricao: "Descrição detalhada do produto 2",
		categoria: "Categoria B",
		preco: 28.8,
		quantidade: 20,
		codeProduct: "002",
		destino: "Doação",
		validade: "2026-06-15",
	},
	{
		nome: "Produto 3",
		descricao: "Descrição detalhada do produto 3",
		categoria: "Categoria C",
		preco: 40.0,
		quantidade: 5,
		codeProduct: "003",
		destino: "Destino Z",
		validade: "2024-12-31",
	},
	{
		nome: "Produto 4",
		descricao: "Descrição detalhada do produto 4",
		categoria: "Categoria A",
		preco: 30.0,
		quantidade: 8,
		codeProduct: "004",
		destino: "Destino W",
		validade: "2025-08-30",
	},
	{
		nome: "Produto 5",
		descricao: "Descrição detalhada do produto 5",
		categoria: "Categoria B",
		preco: 50.75,
		quantidade: 12,
		codeProduct: "005",
		destino: "Destino V",
		validade: "2026-01-01",
	},
	{
		nome: "Produto 6",
		descricao: "Descrição detalhada do produto 6",
		categoria: "Categoria C",
		preco: 19.99,
		quantidade: 15,
		codeProduct: "006",
		destino: "Destino U",
		validade: "2024-11-30",
	},
	{
		nome: "Produto 7",
		descricao: "Descrição detalhada do produto 7",
		categoria: "Categoria A",
		preco: 35.0,
		quantidade: 7,
		codeProduct: "007",
		destino: "Destino T",
		validade: "2025-09-15",
	},
	{
		nome: "Produto 8",
		descricao: "Descrição detalhada do produto 8",
		categoria: "Categoria B",
		preco: 12.49,
		quantidade: 18,
		codeProduct: "008",
		destino: "Destino S",
		validade: "2026-03-20",
	},
	{
		nome: "Produto 9",
		descricao: "Descrição detalhada do produto 9",
		categoria: "Categoria C",
		preco: 45.0,
		quantidade: 6,
		codeProduct: "009",
		destino: "Destino R",
		validade: "2025-11-25",
	},
	{
		nome: "Produto 10",
		descricao: "Descrição detalhada do produto 10",
		categoria: "Categoria A",
		preco: 29.9,
		quantidade: 20,
		codeProduct: "010",
		destino: "Destino Q",
		validade: "2026-10-01",
	},
];

export interface MockedProducts {
	nome: string;
	descricao: string;
	categoria: string;
	preco: number;
	quantidade: number;
	codeProduct: string;
	destino: string;
	validade: string;
}
const TableProducts = ({ tab }: { tab: "expired" | "aboutToExpire" }) => {
	const filteredProducts = filterProductsByTab(mockedProducts, tab);

	const totalValue = calculateTotalValue(filteredProducts);
	const donatedProductsCount = countDonatedProducts(filteredProducts);
	const valueDonatedProducts = calculateDonatedProductsValue(filteredProducts);

	return (
		<div className="max-h-[600px] overflow-y-auto overflow-x-auto bg-white shadow-lg border-t-[1px] rounded-lg">
			<div className="flex flex-wrap gap-4 text-sm font-medium text-gray-700 p-4">
				<p>Total de produtos: {filteredProducts.length}</p>
				<p>Preço total perdido: {formattedPrice(totalValue)}</p>
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
							productName={product.nome}
							productDescription={product.descricao}
							productCategory={product.categoria}
							productPrice={formattedPrice(product.preco)}
							productDestiny={product.destino}
							productQuantity={product.quantidade}
							productCode={product.codeProduct}
							productValidity={formattedDate(product.validade)}
							tempoRestante={daysLeft(product)}
						/>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableProducts;
