import Image from 'next/image';
import React from 'react';
import APPIMG from '../../public/images/relatorio.png';

export default function index() {
  return (
    <section className='w-full bg-principalColor p-7 pt-12 sm:pb-20  flex flex-col items-center'>
        <h2 className='text-3xl text-center text-white uppercase font-semibold'>Funcionalidades</h2>

        <div className="w-full h-fit flex flex-col gap-10 sm:gap-20 px-10 sm:justify-center items-center  mt-8 lg:mt-12">
            <div className="w-full flex items-start">
                <div className="w-full max-w-[400px] h-[200px] flex flex-col justify-between items-start gap-3">
                    <Image
                        src={APPIMG}
                        alt='Dasboard da EcoFood'
                        width={400}
                        height={500}
                    />
                    <p className='text-white text-lg font-medium'>Dasboard interativo com informações sobre os produtos</p>
                </div>
            </div>
            <div className="w-full flex justify-center items-center">
                <div className="w-full max-w-[400px] h-[200px] flex flex-col justify-between items-start gap-3">
                    <Image
                        src={APPIMG}
                        alt='Dasboard da EcoFood'
                        width={400}
                        height={500}
                    />
                    <p className='text-white text-lg font-medium'>Relatórios detalhado sobre os produtos</p>
                </div>
            </div>

            <div className="w-full flex justify-end items-center">
                <div className="w-full max-w-[400px] h-[200px] flex flex-col justify-between items-start gap-3">
                    <Image
                        src={APPIMG}
                        alt='Dasboard da EcoFood'
                        width={400}
                        height={500}
                    />
                    <p className='text-white text-lg font-medium'>Dados atualizados em tempo real</p>
                </div>
            </div>
        </div>
    </section>
  )
}
