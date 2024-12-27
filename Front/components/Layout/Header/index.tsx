'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Logo from '../../../public/images/eco-food-logo.webp';
import { FaHome, FaBox, FaChartBar } from "react-icons/fa";
import useAuthContext from '@/hooks/useAuthContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {isLogged , onHandleLogout} = useAuthContext()
  

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <header className="relative w-full">

      <div className="w-full h-20 flex items-center justify-between bg-principalColor text-white px-3 sm:px-6 shadow-lg">
        <Link href="/" className="z-20">
          <Image
            src={Logo}
            alt="EcoFood Logo"
            width={100}
            height={100}
            className="transition-transform duration-200 hover:scale-105"
          />
        </Link>

      {!isLogged && (
        <nav className="hidden md:flex items-center gap-5">
          <Link href="/auth/login">
            <button className="px-6 py-2 text-[1.05rem] rounded-full transition-all duration-300 hover:bg-buttonBgColor/90 hover:shadow-lg">
              Login
            </button>
          </Link>
          <Link href="/auth/register">
            <button className="px-6 py-2 text-[1.05rem] bg-buttonBgColor rounded-full transition-all duration-300 hover:bg-buttonBgColor/90 hover:shadow-lg">
              Cadastre-se
            </button>
          </Link>
        </nav>
      )}

      {isLogged && (
        <nav className="hidden md:flex items-center gap-5">
        <Link href="/">
          <button onClick={() => onHandleLogout()} className="px-6 py-2 text-[1.05rem] rounded-full transition-all duration-300 hover:bg-buttonBgColor/90 hover:shadow-lg">
            Logout
          </button>
        </Link>
      </nav>
      )}
        

        {isMobile && (
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="z-20 p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
            aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isOpen ? (
              <X size={28} className="text-white" />
            ) : (
              <Menu size={28} className="text-white" />
            )}
          </button>
        )}
      </div>


      {isMobile && (
        <div
          className={`fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100 z-10" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsOpen(false)}
        />
      )}


      <div
        className={`fixed top-0 right-0 h-full w-72 bg-principalColor shadow-2xl transform transition-transform duration-300 ease-in-out z-10 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-6">
          <Link
            href="/auth/login"
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            <button className="w-full px-6 py-3 text-[1.05rem] rounded-full transition-all duration-300 hover:bg-buttonBgColor/90 hover:shadow-lg text-white">
              Login
            </button>
          </Link>
          <Link
            href="/auth/register"
            className="w-full"
            onClick={() => setIsOpen(false)}
          >
            <button className="w-full px-6 py-3 text-[1.05rem] bg-buttonBgColor rounded-full transition-all duration-300 hover:bg-buttonBgColor/90 hover:shadow-lg text-white">
              Cadastre-se
            </button>
          </Link>
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
        </div>
      </div>
    </header>
  );
};

export default Header;