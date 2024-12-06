"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    background: "/images/image2.png",
    image: "/images/image2.png",
    title: "Gestion des processus",
    description:
      "Impose de nouvelles règles pour l'importation du cacao en Europe, les entreprises doivent donc prouver que tous leurs produits sont indemnes de déforestation avant toute exportation. cela implique une traçabilité renforcée, des pratiques agricoles durables et le soutient aux communautés locales et ceci en apportant des preuves à chaque étapes du du processus",
    buttonText: "En savoir plus",
  },
  {
    id: 2,
    background: "/images/image1.png",
    image: "/images/image1.png",
    title: "Traçabilité du cacao",
    description:
      "Les entreprises sont légalement tenu de prouver que leurs produits ne participe pas la dégradation et la destruction des forêts; pour y parvenir une traçabilité rigoureuse est indispensable de la plantation jusqu'à l'usine ainsi que son entreposage",
    buttonText: "Découvrir",
  },
  {
    id: 3,
    background: "/images/image3.png",
    image: "/images/image3.png",
    title: "Qualité améliorée",
    description:
      "la RDUE est un levier puissant pour l'amélioration de la qualité des produits consommés car créant autour de se produit un environnement favorable pour la mise en oeuvre des pratiques agricoles durable ainsi que la valorisation des ce produit",
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
    <div
      className="relative h-screen w-full overflow-hidden bg-gray-100 dark:bg-gray-900"
      id="about-us"
    >
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
        <div className="text-4xl font-bold text-center py-10 text-gray-900 dark:text-gray-100 shadow-md">
          About Us
        </div>
        <div className="relative w-10/12 mx-auto h-auto md:h-96 flex flex-col md:flex-row items-center justify-center overflow-hidden">
          {/* Image avec effet */}
          <div className="relative w-full md:w-1/2 h-full group overflow-hidden hidden md:block">
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

          {/* Section de contenu */}
          <div className="relative w-full md:w-1/2 h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col justify-center px-8 py-5 md:px-16">
            <h2 className="text-4xl font-bold mb-4">
              {slides[currentIndex].title}
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
              {slides[currentIndex].description}
            </p>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600">
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
              currentIndex === index
                ? "bg-blue-600 dark:bg-blue-400"
                : "bg-gray-300 dark:bg-gray-600"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};
