import Image from 'next/image'
import Link from 'next/link'
import React from 'react';
import Logo from '../../../public/images/eco-food-logo.png'

export default function index() {
  return (
    <header className='w-full h-20 flex items-center justify-between'>
        <Link href='/'>
            <Image
                src={}
                alt="EcoFood Logo"
                width={80}
                height={80}
            />
        </Link>
    </header>
  )
}
