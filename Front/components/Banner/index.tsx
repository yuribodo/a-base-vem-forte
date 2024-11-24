import React from "react";
import Image from "next/image";
import BannerIllustrationDesktop from "../../public/images/banner-illustration-small.webp";

export default function index() {
  return (
    <main className="w-full h-full max-h-[calc(100vh-5rem)] flex items-center px-5 sm:px-10">
			<div className="w-2/3 h-full flex flex-col justify-center items-center px-10 gap-5">
				<h1 className="text-4xl text-buttonBgColor uppercase font-bold">Gestão inteligente para um mundo mais sustentável. <br/> evite desperdícios e maximize oportunidades.</h1>

				<div className="w-full">
					<button className="bg-[#59c05c] text-white w-72 text-xl rounded-lg py-[10px] hover:bg-[#46a14c] ease-in-out transition duration-300 bg-buttonBgColor/90 hover:shadow-lg">
						Conheça nosso sistema
					</button>
				</div>
			</div>

        <div className="w-1/3">
        <Image
            src={BannerIllustrationDesktop}
            alt="Imagem que reflete sustentabilide no mundo"
            width={500}
            height={500}
        />
        </div>
    </main>
  )
}