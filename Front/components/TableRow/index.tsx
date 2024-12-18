interface TableProductsProps {
	productName: string;
	productDescription: string;
	productCategory: string;
	productPrice: number;
	productDestiny: string;
	productQuantity: number;
	productCode: string;
	productValidity: string;
	tempoRestante: number;
	tab : string;
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
	tab
}) => {
	return (
		<tr className="hover:bg-gray-50 text-xs sm:text-sm">
			<td className="px-2 sm:px-4 py-2 border-b border-gray-200 text-gray-700">
				{productName}
			</td>
			<td className="hidden sm:table-cell px-2 sm:px-4 py-2 border-b border-gray-200 text-gray-700">
				{productDescription}
			</td>
			<td className="px-2 sm:px-4 py-2 border-b border-gray-200 text-gray-700">
				{productCategory}
			</td>
			<td className="px-2 sm:px-4 py-2 border-b border-gray-200 text-gray-700">
				{productPrice}
			</td>
			<td className="px-2 sm:px-4 py-2 border-b border-gray-200 text-gray-700">
				{productQuantity}
			</td>
			<td className="px-2 sm:px-4 py-2 border-b border-gray-200 text-gray-700">
				{productCode}
			</td>
			<td className="hidden md:table-cell px-2 sm:px-4 py-2 border-b border-gray-200 text-gray-700">
				{productDestiny}
			</td>
			<td className="hidden lg:table-cell px-2 sm:px-4 py-2 border-b border-gray-200 text-gray-700">
				{productValidity}
			</td>
			{tab === "aboutToExpire" && (
				<td className="px-2 sm:px-4 py-2 border-b border-gray-200 text-gray-700">
					{tempoRestante} Dias
				</td>
			)}
		</tr>
	);
};

export default TableRow;
