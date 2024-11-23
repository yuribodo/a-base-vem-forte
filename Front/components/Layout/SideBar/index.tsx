'use client';

import React from "react";
import Link from "next/link";
import { FaHome, FaBox, FaChartBar } from "react-icons/fa"; 
import Image from "next/image";
import icon from "@/public/images/eco-food-logo.png"


const index = () => {
  return (
    <aside className="h-screen w-64 bg-[#3a8b40] text-white flex flex-col shadow-lg">
      
      <div className="p-4 text-2xl font-bold border-b border-white/10 flex items-center space-x-2">
        <div className="w-14 h-10  rounded-full flex items-center justify-center text-[#3a8b40] font-bold">
          <Image src={icon} alt="icon" width={140} height={244}/>
        </div>
        <span>Eco Food</span>
      </div>

      
      <nav className="flex-1 p-4 space-y-4">
        <Link
          href="/dashboard"
          className="flex items-center px-4 py-2 rounded-md hover:bg-white/10 transition-all group space-x-2"
        >
          <FaHome  />
          <span className="text-[1.05rem]font-medium">Dashboard</span>
        </Link>
        <Link
          href="/produtos"
          className="flex items-center px-4 py-2 rounded-md hover:bg-white/10 transition-all group space-x-2"
        >
          <FaBox  />
          <span className="text-[1.05rem] font-medium">Produtos</span>
        </Link>
        <Link
          href="/relatorio"
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
