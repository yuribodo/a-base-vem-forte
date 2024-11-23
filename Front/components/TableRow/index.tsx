interface TableProductsProps {
	productName: string;
	productDescription: string;
	productCategory: string;
	productPrice: string;
	productDestiny: string;
	productQuantity: number;
	productCode: string;
	productValidity: string;
	tempoRestante: number;
}

const TableRow: React.FC<TableProductsProps> = ({
	productName,
	productDescription,
	productCategory,
	productPrice,
	productDestiny,
	productQuantity,
	productCode,
	productValidity,
	tempoRestante,
}) => {
	return (
		<tr className="hover:bg-gray-50">
			<td className="px-4 py-2 border-b border-gray-200 text-gray-700">
				{productName}
			</td>
			<td className="px-4 py-2 border-b border-gray-200 text-gray-700">
				{productDescription}
			</td>
			<td className="px-4 py-2 border-b border-gray-200 text-gray-700">
				{productCategory}
			</td>
			<td className="px-4 py-2 border-b border-gray-200 text-gray-700">
				{productPrice}
			</td>
			<td className="px-4 py-2 border-b border-gray-200 text-gray-700">
				{productQuantity}
			</td>
			<td className="px-4 py-2 border-b border-gray-200 text-gray-700">
				{productCode}
			</td>
			<td className="px-4 py-2 border-b border-gray-200 text-gray-700">
				{productDestiny}
			</td>
			<td className="px-4 py-2 border-b border-gray-200 text-gray-700">
				{productValidity}
			</td>
			{tempoRestante > 0 && (
				<td className="px-4 py-2 border-b border-gray-200 text-gray-700">
					{tempoRestante} Dias
				</td>
			)}
		</tr>
	);
};

export default TableRow;
