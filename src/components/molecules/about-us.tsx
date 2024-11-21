"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    background: "/images/image1.png",
    image:
      "https://cdn-3.expansion.mx/dims4/default/18e94bd/2147483647/strip/true/crop/1000x693+0+0/resize/1800x1247!/format/webp/quality/80/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F95%2F21%2F09929bae47738bb2d85e16fd7a61%2Fcacao.jpg",
    title: "Gestion du cacao",
    description:
      "Optimisez la gestion des plantations pour une meilleure production et traçabilité. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla doloribus accusamus nihil, dolorum praesentium recusandae voluptatum repellat iure, eveniet necessitatibus quasi architecto itaque, sed enim minima. Illo distinctio ea fugit?",
    buttonText: "En savoir plus",
  },
  {
    id: 2,
    background: "/images/image2.png",
    image:
      "https://cdn-3.expansion.mx/dims4/default/442781a/2147483647/strip/true/crop/1254x836+0+0/resize/1200x800!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F5e%2F18%2F1b1b4a7747bfb130f5c39d6467e5%2Fcacao-semillas.jpg",
    title: "Traçabilité du cacao",
    description:
      "Suivez chaque étape du processus, de la graine à la tablette. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla doloribus accusamus nihil, dolorum praesentium recusandae voluptatum repellat iure, eveniet necessitatibus quasi architecto itaque, sed enim minima. Illo distinctio ea fugit?",
    buttonText: "Découvrir",
  },
  {
    id: 3,
    background: "/images/image3.png",
    image:
      "https://cdn-3.expansion.mx/dims4/default/394d05e/2147483647/strip/true/crop/1000x667+0+0/resize/1200x800!/format/webp/quality/60/?url=https%3A%2F%2Fcdn-3.expansion.mx%2F27%2Ffe%2Fac694c0a492082d85e8154c8dd34%2Fcacao-planta.jpg",
    title: "Qualité améliorée",
    description:
      "Apprenez à améliorer la qualité de votre production grâce à nos outils. Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla doloribus accusamus nihil, dolorum praesentium recusandae voluptatum repellat iure, eveniet necessitatibus quasi architecto itaque, sed enim minima. Illo distinctio ea fugit?",
    buttonText: "Commencer",
  },
];

export const AboutUs: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); // Change toutes les 6 secondes
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background slider */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              currentIndex === index ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${slide.background})` }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full">
        <div className="text-4xl font-bold text-center py-10 text-white shadow-md">
          About Us
        </div>
        <div className="relative w-10/12 mx-auto h-96 flex items-center justify-center overflow-hidden">
          {/* Image avec effet */}
          <div className="relative w-1/2 h-full group overflow-hidden">
            <Image
              src={slides[currentIndex].image}
              alt={slides[currentIndex].title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-700 ease-in-out group-hover:scale-110"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

            {/* Contenu de l'image */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h2 className="text-white text-3xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                {slides[currentIndex].title}
              </h2>
            </div>
          </div>

          {/* Section de contenu avec séparation inclinée */}
          <div className="relative w-1/2 h-full bg-white text-gray-900 flex flex-col justify-center px-8 md:px-16">
            {/* Inclinaison en utilisant clip-path */}
            <div className="absolute inset-0 bg-white clip-triangle z-[-1]"></div>

            {/* Contenu */}
            <h2 className="text-4xl font-bold mb-4">
              {slides[currentIndex].title}
            </h2>
            <p className="text-lg text-gray-700 mb-6">
              {slides[currentIndex].description}
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500">
              {slides[currentIndex].buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-4 h-4 rounded-full ${
              currentIndex === index ? "bg-blue-600" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// const carouselItems = [
//   {
//     id: 1,
//     image: "https://via.placeholder.com/800x400?text=Slide+1",
//     title: "Gestion du cacao",
//     description: "Optimisation de la gestion des plantations.",
//   },
//   {
//     id: 2,
//     image: "https://via.placeholder.com/800x400?text=Slide+2",
//     title: "Traçabilité",
//     description: "Suivi précis du processus de culture.",
//   },
//   {
//     id: 3,
//     image: "https://via.placeholder.com/800x400?text=Slide+3",
//     title: "Partage de données",
//     description: "Diffusion efficace des données sur la culture.",
//   },
//   {
//     id: 4,
//     image: "https://via.placeholder.com/800x400?text=Slide+4",
//     title: "Qualité améliorée",
//     description: "Conseils pratiques pour une production de qualité.",
//   },
//   {
//     id: 5,
//     image: "https://via.placeholder.com/800x400?text=Slide+5",
//     title: "Collaboration",
//     description: "Partage d'idées entre producteurs.",
//   },
// ];

// export const AboutUs: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleNext = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex(
//       (prevIndex) =>
//         (prevIndex - 1 + carouselItems.length) % carouselItems.length
//     );
//   };

//   useEffect(() => {
//     const interval = setInterval(handleNext, 5000); // Défilement automatique toutes les 5s
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full max-w-6xl mx-auto overflow-hidden">
//       {/* Slider */}
//       <div
//         className="flex transition-transform duration-700 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {carouselItems.map((item) => (
//           <div
//             key={item.id}
//             className="min-w-full flex-shrink-0 flex flex-col items-center justify-center bg-gray-100"
//           >
//             <Image
//               src={item.image}
//               alt={item.title}
//               width={800}
//               height={400}
//               className="object-cover rounded-md"
//             />
//             <div className="p-4 text-center">
//               <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
//               <p className="text-gray-700">{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Boutons de navigation */}
//       <button
//         onClick={handlePrev}
//         className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75"
//       >
//         &#8592;
//       </button>
//       <button
//         onClick={handleNext}
//         className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75"
//       >
//         &#8594;
//       </button>

//       {/* Indicateurs */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {carouselItems.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => setCurrentIndex(index)}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === index ? "bg-black" : "bg-gray-400"
//             }`}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// "use client";

// import Image from "next/image";
// import { useEffect, useState } from "react";

// const carouselItems = [
//   {
//     id: 1,
//     image: "/images/hero-top/illustrative1.png",
//     title: "Gestion efficace",
//     description: "Suivez la gestion et la traçabilité complète du cacao.",
//   },
//   {
//     id: 2,
//     image: "/images/hero-top/illustrative2.png",
//     title: "Traçabilité transparente",
//     description: "Chaque étape de la culture est enregistrée avec précision.",
//   },
//   {
//     id: 3,
//     image: "/images/hero-top/illustrative1.png",
//     title: "Optimisation de la production",
//     description: "Améliorez la qualité grâce à des outils analytiques avancés.",
//   },
//   {
//     id: 4,
//     image: "/images/hero-top/illustrative2.png",
//     title: "Collaboration efficace",
//     description: "Travaillez en réseau avec d'autres producteurs.",
//   },
// ];

// export const AboutUs: React.FC = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
//     }, 3000); // Change toutes les 3 secondes

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full h-[500px] overflow-hidden">
//       <div
//         className="flex transition-transform duration-1000"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {carouselItems.map((item) => (
//           <div key={item.id} className="w-full flex-shrink-0">
//             <Image
//               src={item.image}
//               alt={item.title}
//               width={800}
//               height={500}
//               className="object-cover w-full h-full"
//             />
//             <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-4 text-white">
//               <h3 className="text-2xl font-bold">{item.title}</h3>
//               <p className="mt-2">{item.description}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Navigation dots */}
//       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
//         {carouselItems.map((_, index) => (
//           <button
//             key={index}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === index ? "bg-white" : "bg-gray-400"
//             }`}
//             onClick={() => setCurrentIndex(index)}
//           ></button>
//         ))}
//       </div>
//     </div>
//   );
// };

// *******************************************

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
