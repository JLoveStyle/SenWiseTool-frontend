"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const carouselItems = [
  {
    id: 1,
    image: "/images/hero-top/illustrative1.png",
    title: "Gestion efficace",
    description: "Suivez la gestion et la traçabilité complète du cacao.",
  },
  {
    id: 2,
    image: "/images/hero-top/illustrative2.png",
    title: "Traçabilité transparente",
    description: "Chaque étape de la culture est enregistrée avec précision.",
  },
  {
    id: 3,
    image: "/images/hero-top/illustrative1.png",
    title: "Optimisation de la production",
    description: "Améliorez la qualité grâce à des outils analytiques avancés.",
  },
  {
    id: 4,
    image: "/images/hero-top/illustrative2.png",
    title: "Collaboration efficace",
    description: "Travaillez en réseau avec d'autres producteurs.",
  },
];

export const AboutUs: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
    }, 3000); // Change toutes les 3 secondes

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[500px] overflow-hidden">
      <div
        className="flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {carouselItems.map((item) => (
          <div key={item.id} className="w-full flex-shrink-0">
            <Image
              src={item.image}
              alt={item.title}
              width={800}
              height={500}
              className="object-cover w-full h-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
              <h3 className="text-2xl font-bold">{item.title}</h3>
              <p className="mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {carouselItems.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => setCurrentIndex(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { Button } from "../ui/button";

// const cards = [
//   {
//     id: 1,
//     image: "https://example.com/image1.jpg",
//     title: "Gestion efficace du cacao",
//     description:
//       "Découvrez comment notre application optimise la gestion des plantations de cacao en permettant un suivi précis de chaque étape, de la culture à la récolte.",
//   },
//   {
//     id: 2,
//     image: "https://example.com/image2.jpg",
//     title: "Traçabilité du processus",
//     description:
//       "Suivez chaque étape du processus de culture, de la plantation jusqu'au produit final, grâce à une traçabilité numérique et détaillée qui assure la transparence et la qualité.",
//   },
//   {
//     id: 3,
//     image: "https://example.com/image3.jpg",
//     title: "Diffusion et partage",
//     description:
//       "Partagez les informations sur les meilleures pratiques de culture et assurez une diffusion efficace des données pertinentes pour maximiser la productivité.",
//   },
// ];

// export const AboutUs: React.FC = () => {
//   const [expandedCard, setExpandedCard] = useState<number | null>(null);

//   const handleToggleExpand = (id: number) => {
//     setExpandedCard(expandedCard === id ? null : id);
//   };

//   return (
//     <div className="h-screen flex flex-col justify-center items-center bg-gradient-to-b from-green-700 via-green-500 to-green-300 py-16 px-4">
//       {/* Titre */}
//       <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
//         À propos de notre application
//       </h2>

//       {/* Carousel */}
//       <div className="flex overflow-x-auto space-x-6 w-full max-w-6xl snap-x snap-mandatory scrollbar-hide">
//         {cards.map((card) => (
//           <div
//             key={card.id}
//             className="snap-center flex-shrink-0 w-80 bg-white rounded-lg shadow-lg transform transition-transform hover:scale-105"
//           >
//             {/* Image */}
//             <Image
//               src={card.image}
//               alt={card.title}
//               width={320}
//               height={200}
//               className="rounded-t-lg object-cover"
//             />

//             {/* Contenu */}
//             <div className="p-4">
//               <h3 className="text-xl font-semibold text-gray-800">
//                 {card.title}
//               </h3>
//               <p className="text-gray-600 mt-2">
//                 {expandedCard === card.id
//                   ? card.description
//                   : `${card.description.substring(0, 100)}...`}
//               </p>
//               {card.description.length > 100 && (
//                 <Button
//                   className="mt-3 bg-primary text-white hover:opacity-90"
//                   onClick={() => handleToggleExpand(card.id)}
//                 >
//                   {expandedCard === card.id ? "Voir moins" : "Voir plus"}
//                 </Button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// ********************************************************************

// import { CardAboutUs } from "../atoms/card-about-us";
// import { Container } from "../atoms/container";
// import { Button } from "../ui/button";

// export const AboutUs = () => {
//   return (
//     <Container className="bg-about-us h-full">
//       <div>
//         <div className="text-4xl font-bold text-center py-5">ABOUT US</div>
//         <div>
//           <CardAboutUs />
//         </div>
//         <div className="text-center py-5">
//           <Button>SUBSCRIBE NOW</Button>
//         </div>
//       </div>
//     </Container>
//   );
// };
