import Image from 'next/image';
import React from 'react';

export default function index() {
  return (
    <section className='w-full h-screen bg-principalColor p-7 pt-12'>
        <h2 className='text-3xl text-center text-white uppercase font-semibold'>Funcionalidades</h2>

        <div className="w-full h-full flex flex-col lg:flex-row gap-10 px-10 justify-center items-center">
            <div className="w-full max-w-[320px]">
                <Image
                    src={""}
                    alt='Dasboard da EcoFood'
                    width={200}
                    height={200}
                />
                <p className='text-white text-lg font-medium'>Dasboard interativo com informações sobre os produtos</p>
            </div>
            <div className="w-full max-w-[320px]">
                <Image
                    src={""}
                    alt='Dasboard da EcoFood'
                    width={200}
                    height={200}
                />
                <p className='text-white text-lg font-medium'>Relatórios detalhado sobre os produtos</p>
            </div>
            <div className="w-full max-w-[320px]">
                <Image
                    src={""}
                    alt='Dasboard da EcoFood'
                    width={200}
                    height={200}
                />
                <p className='text-white text-lg font-medium'>Dados atualizados em tempo real</p>
            </div>
        </div>
    </section>
  )
}
