"use client";

import Image from "next/image";
import React, { useState } from "react";

const images = [
  {
    id: 1,
    src: "/images/features/1.png",
    title: "Gestion des cultures",
    shortDescription: "Optimisez vos rendements agricoles.",
    fullDescription:
      "Grâce à notre outil, planifiez et suivez vos cultures avec une précision inégalée, en maximisant vos ressources et vos rendements.",
  },
  {
    id: 2,
    src: "/images/features/2.png",
    title: "Traçabilité",
    shortDescription: "Suivez chaque étape du processus.",
    fullDescription:
      "Garantissez la traçabilité complète de vos produits du champ à la table, tout en respectant les normes internationales.",
  },
  {
    id: 3,
    src: "/images/features/3.png",
    title: "Diffusion",
    shortDescription: "Partagez vos produits avec le monde.",
    fullDescription:
      "Accédez à des marchés internationaux grâce à notre plateforme de diffusion efficace et conviviale.",
  },
  {
    id: 4,
    src: "/images/features/4.png",
    title: "Innovation",
    shortDescription: "Adoptez les dernières technologies.",
    fullDescription:
      "Découvrez des outils innovants pour moderniser votre processus agricole et rester compétitif.",
  },
];

export const Features: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const handleClose = () => {
    setSelectedImage(null);
  };

  return (
    <div className="py-12 bg-gray-100 dark:bg-gray-900" id="features">
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
          Features
        </h2>
        <p className="text-md text-gray-600 dark:text-gray-300 mt-2">
          Découvrez les fonctionnalités clés qui font la différence.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 lg:px-8">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-md shadow-md cursor-pointer"
          >
            {/* Image */}
            <Image
              src={image.src}
              alt={image.title}
              layout="responsive"
              width={600}
              height={400}
              className="transition-transform duration-500 group-hover:scale-105"
            />

            {/* Hover Content */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-white px-4 text-center">
              <h3 className="text-lg font-bold">{image.title}</h3>
              <p className="text-sm mt-1">{image.shortDescription}</p>
              <button
                onClick={() => setSelectedImage(image.id)}
                className="mt-3 px-3 py-1.5 bg-blue-600 text-sm rounded-md shadow hover:bg-blue-500"
              >
                Voir plus
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for Full Preview */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden w-11/12 md:w-3/4 lg:w-1/2">
            {/* Image */}
            <div className="relative h-48 md:h-72">
              <Image
                src={images.find((img) => img.id === selectedImage)?.src || ""}
                alt={
                  images.find((img) => img.id === selectedImage)?.title || ""
                }
                layout="fill"
                objectFit="cover"
              />
            </div>

            {/* Content */}
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                {images.find((img) => img.id === selectedImage)?.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                {
                  images.find((img) => img.id === selectedImage)
                    ?.fullDescription
                }
              </p>
              <div className="flex justify-center ">
                <button
                  onClick={handleClose}
                  className="mt-5 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600"
                >
                  Compris
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
