import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import Logo from '../../../public/images/eco-food-logo.webp'
import Button from '@/components/Button';

export default function index() {
  return (
    <header className='w-full h-20 flex items-center justify-between bg-principalColor text-white px-6'>
        <Link href='/'>
            <Image
                src={Logo}
                alt="EcoFood Logo"
                width={100}
                height={100}
            />
        </Link>

        <div className="flex items-center gap-5">
          <Link href='/'>
            <Button className='bg-transparent text-[1.05rem] hover:bg-buttonBgColor'>
                Login
            </Button>
          </Link>
          <Link href='/'>
            <Button className='bg-transparent text-[1.05rem] hover:bg-buttonBgColor'>
                Cadastre-se
            </Button>
          </Link>
        </div>
        
    </header>
  )
}
