'use client';

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; 
import { FaHome, FaBox, FaChartBar } from "react-icons/fa"; 

type SideBarProps = {
  className?: string;
};

const SideBar: React.FC<SideBarProps> = ({ className }) => {
  const pathname = usePathname(); 

  return (
    <aside className={`min-h-screen w-64 bg-[#3a8b40] text-white flex flex-col shadow-lg ${className}`}>
      <nav className="flex-1 p-4 space-y-4">
        <Link
          href="/dashboard"
          className={`flex items-center px-4 py-2 rounded-md transition-all group space-x-2 ${
            pathname === "/dashboard" ? "bg-white/20 font-bold" : "hover:bg-white/10"
          }`}
        >
          <FaHome />
          <span className="text-[1.05rem] font-medium">Dashboard</span>
        </Link>
        <Link
          href="/produtos"
          className={`flex items-center px-4 py-2 rounded-md transition-all group space-x-2 ${
            pathname === "/produtos" ? "bg-white/20 font-bold" : "hover:bg-white/10"
          }`}
        >
          <FaBox />
          <span className="text-[1.05rem] font-medium">Produtos</span>
        </Link>
        <Link
          href="/relatorio"
          className={`flex items-center px-4 py-2 rounded-md transition-all group space-x-2 ${
            pathname === "/relatorio" ? "bg-white/20 font-bold" : "hover:bg-white/10"
          }`}
        >
          <FaChartBar />
          <span className="text-[1.05rem] font-medium">Relatório</span>
        </Link>
      </nav>
    </aside>
  );
};

export default SideBar;
