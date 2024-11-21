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
    <section className="py-12 bg-gray-100">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800">Features</h2>
        <p className="text-lg text-gray-600 mt-2">
          Découvrez les fonctionnalités clés qui font la différence.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-6 lg:px-12">
        {images.map((image) => (
          <div
            key={image.id}
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
          >
            {/* Image */}
            <Image
              src={image.src}
              alt={image.title}
              layout="responsive"
              width={800}
              height={600}
              className="transition-transform duration-500 group-hover:scale-110"
            />

            {/* Hover Content */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center text-white">
              <h3 className="text-xl font-bold">{image.title}</h3>
              <p className="text-sm mt-2">{image.shortDescription}</p>
              <button
                onClick={() => setSelectedImage(image.id)}
                className="mt-4 px-4 py-2 bg-blue-600 rounded-md shadow-md hover:bg-blue-500"
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
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-11/12 md:w-3/4 lg:w-1/2">
            {/* Image */}
            <div className="relative h-64 md:h-96">
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
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800">
                {images.find((img) => img.id === selectedImage)?.title}
              </h3>
              <p className="text-gray-600 mt-4">
                {
                  images.find((img) => img.id === selectedImage)
                    ?.fullDescription
                }
              </p>
              <div className="flex justify-center ">
                <button
                  onClick={handleClose}
                  className="mt-6 px-4 py-2 bg-green-700 text-white rounded-md hover:bg-green-600"
                >
                  Compris
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
