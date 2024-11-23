'use client';

import React from "react";
import Link from "next/link";
import { FaHome, FaBox, FaChartBar } from "react-icons/fa"; 

type SideBarProps = {
  className?: string;  
};


const index: React.FC<SideBarProps> = ({ className }) => {
  return (
    <aside className={`h-full w-64 bg-[#3a8b40] text-white flex flex-col shadow-lg ${className}`}>
      <nav className="flex-1 p-4 space-y-4">
        <Link
          href="/main/dashboard"
          className="flex items-center px-4 py-2 rounded-md hover:bg-white/10 transition-all group space-x-2"
        >
          <FaHome  />
          <span className="text-[1.05rem]font-medium">Dashboard</span>
        </Link>
        <Link
          href="/main/produtos"
          className="flex items-center px-4 py-2 rounded-md hover:bg-white/10 transition-all group space-x-2"
        >
          <FaBox  />
          <span className="text-[1.05rem] font-medium">Produtos</span>
        </Link>
        <Link
          href="/main/relatorio"
          className="flex items-center px-4 py-2 rounded-md hover:bg-white/10 transition-all group space-x-2"
        >
          <FaChartBar  />
          <span className="text-[1.05rem]font-medium">Relatório</span>
        </Link>
      </nav>
    </aside>
  );
};

export default index;
