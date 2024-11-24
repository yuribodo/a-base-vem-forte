"use client";
import Button from "@/components/Button";
import TableProducts from "@/components/TableProducts";
import { useState } from "react";

const ReportPage = () => {
	const [activeTab, setActiveTab] = useState<
		"expired" | "aboutToExpire" | null
	>(null);

	const toggleExpiredProducts = () => {
		setActiveTab(activeTab === "expired" ? null : "expired");
	};

	const toggleAboutToExpireProducts = () => {
		setActiveTab(activeTab === "aboutToExpire" ? null : "aboutToExpire");
	};

	return (
		<div className="flex flex-col gap-4 px-4 max-w-screen sm:px-6 md:px-8">
			<div className="flex flex-col w-full">
				<div className="flex flex-col gap-2">
					<h2 className="md:text-2xl text-xl font-bold">Relatório</h2>
					<p className="text-sm sm:text-xs text-gray-700">
						Ficou fácil para você ver o relatório dos produtos, clique em um dos
						botões abaixo.
					</p>
				</div>
			</div>
			<div className="flex flex-row gap-2">
				<Button
					className={`px-4 py-2 rounded ${
						activeTab === "expired"
							? "bg-red-500 text-white"
							: "bg-gray-200 text-gray-800"
					}`}
					onClick={toggleExpiredProducts}
				>
					Produtos Vencidos
				</Button>
				<Button
					className={`px-4 py-2 rounded ${
						activeTab === "aboutToExpire"
							? "bg-red-500 text-white"
							: "bg-gray-200 text-gray-800"
					}`}
					onClick={toggleAboutToExpireProducts}
				>
					Produtos a vencer
				</Button>
			</div>

			{activeTab === "expired" && <TableProducts tab="expired" />}
			{activeTab === "aboutToExpire" && <TableProducts tab="aboutToExpire" />}
		</div>
	);
};

export default ReportPage;
