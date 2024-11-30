"use client";

import { Route } from "@/lib/route";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

const backgroundColors = [
  "bg-[#14645b]",
  "bg-[#be182b]",
  "bg-black",
  "bg-[#8a5da1]",
  "bg-[#edb933]",
];
const images = [
  "/images/hero-top/1.png",
  "/images/hero-top/2.png",
  "/images/hero-top/3.png",
  "/images/hero-top/4.png",
  "/images/hero-top/5.png",
];

export const HeroTop: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransitioning(true); // Début de la transition de disparition

      setTimeout(() => {
        setCurrentIndex((prevIndex) => {
          const newIndex = (prevIndex + 1) % images.length;
          setNextIndex((newIndex + 1) % images.length);
          return newIndex;
        });
        setTransitioning(false); // Fin de la transition après le changement
      }, 1000); // Durée de la transition avant de changer d'image
    }, 8000); // Durée totale entre les changements

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`h-screen flex items-center justify-between px-4 lg:px-16 transition-colors duration-1000 ${backgroundColors[currentIndex]}`}
      id="home"
    >
      {/* Texte à gauche */}
      <div className="w-full lg:w-1/2 flex flex-col items-start justify-center text-white space-y-6">
        <h1 className="text-4xl lg:text-6xl font-bold">
          Digitalisation des processus de traçabilités
        </h1>
        <p className="text-lg lg:text-xl">
          Découvrez la traçabilité du cacao, de la graine jusqu'au chocolat. Une
          expérience unique de transparence et de qualité supérieure.
        </p>
        <Link href={Route.signUp}>
          <Button className="bg-primary text-white hover:opacity-90">
            Getting Started
          </Button>
        </Link>
      </div>

      {/* Images à droite */}
      <div className="hidden lg:block w-1/2 h-full relative">
        {/* Image actuelle */}
        <Image
          src={images[currentIndex]}
          alt="Cocoa Image"
          layout="fill"
          objectFit="cover"
          className={`rounded-lg transform transition-transform duration-1000 ${
            transitioning ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Image suivante (en train d'apparaître) */}
        <Image
          src={images[nextIndex]}
          alt="Next Cocoa Image"
          layout="fill"
          objectFit="cover"
          className={`rounded-lg transform transition-transform duration-1000 absolute top-0 left-0 ${
            transitioning
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10"
          }`}
        />
      </div>

      {/* Pour les écrans plus petits */}
      <div className="block lg:hidden w-full text-center text-white mt-8 bg-red-400">
        <h1 className="text-3xl font-bold">Bienvenue dans le monde du cacao</h1>
        <p className="text-base mt-4">
          Découvrez la traçabilité du cacao, de la graine jusqu'au chocolat.
        </p>
        <Link href={Route.signUp}>
          <Button className="mt-6 bg-blue-600 text-white hover:opacity-90">
            Getting Started
          </Button>
        </Link>
      </div>
    </div>
  );
};

// import { Route } from "@/lib/route";
// import Image from "next/image";
// import Link from "next/link";
// import { Container } from "../atoms/container";
// import { Button } from "../ui/button";

// export const HeroTop = () => {
//   return (
//     // <Container
//     //   full
//     //   className="section w-full h-screen flex justify-between items-center hero-top-image"
//     // >
//     // <Container className="bg-gradient-to-br sm:bg-gradient-to-r from-black sm:from-neutral-50 sm:via-white to-white/0 h-screen sm:w-3/4">
//     <div className=" flex flex-col pt-16 h-full gap-20 sm:gap-10 bg-red-500">
//       <Container>
//         <div className="sm:hidden flex items-center justify-center w-full -my-10">
//           <Image src="/images/logo.png" width={200} height={200} alt="logo" />
//         </div>
//         <h1 className="font-extrabold text-3xl text-white sm:text-black sm:text-5xl sm:max-w-xl text-center sm:text-start">
//           Powerful and intuitive data collection tools to make an impact
//         </h1>
//         <p className="text-xl sm:text-gray-600 text-white sm:font-normal text-center sm:text-start">
//           High quality data collection for everyone
//         </p>
//         <div className="flex items-center gap-10 justify-center sm:justify-start">
//           <Link href={Route.signUp}>
//             <Button className="bg-primary hover:opacity-90 px-10">
//               Get started
//             </Button>
//           </Link>
//           {/* <Button
//               variant="outline"
//               className="border-primary bg-transparent text-primary hover:bg-primary/25 hover:text-primary rounded-none"
//             >
//               Login
//             </Button> */}
//         </div>
//       </Container>
//     </div>
//     // </Container>
//     // </Container>
//   );
// };
