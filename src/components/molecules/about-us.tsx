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
          <div className="relative w-1/2 h-full bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex flex-col justify-center px-8 md:px-16">
            {/* Inclinaison en utilisant clip-path */}
            <div className="absolute inset-0 bg-white dark:bg-gray-800 clip-triangle z-[-1]"></div>

            {/* Contenu */}
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
