"use client";

import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import {
  FaDatabase,
  FaRoute,
  FaSeedling,
  FaTree,
  FaUsers,
} from "react-icons/fa";

const services = [
  {
    title: "Gestion",
    description:
      "Optimisez la gestion de vos ressources et vos processus au quotidien.",
    icon: <FaDatabase className="text-white text-6xl" />,
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    title: "Traçabilité",
    description:
      "Suivez chaque étape de vos opérations avec une précision optimale.",
    icon: <FaRoute className="text-white text-6xl" />,
    gradient: "from-teal-400 via-blue-400 to-cyan-500",
  },
  {
    title: "Revenus et Responsabilités Partagés",
    description:
      "Encouragez une répartition équitable des bénéfices et des responsabilités.",
    icon: <FaUsers className="text-white text-6xl" />,
    gradient: "from-yellow-400 via-orange-500 to-red-500",
  },
  {
    title: "Agriculture",
    description: "Appliquez des pratiques agricoles modernes et efficaces.",
    icon: <FaSeedling className="text-white text-6xl" />,
    gradient: "from-green-500 via-lime-500 to-emerald-500",
  },
  {
    title: "Social",
    description:
      "Renforcez les liens communautaires et favorisez l'inclusion sociale.",
    icon: <FaUsers className="text-white text-6xl" />,
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
  },
  {
    title: "Environnement",
    description:
      "Protégez et préservez l'environnement pour les générations futures.",
    icon: <FaTree className="text-white text-6xl" />,
    gradient: "from-green-700 via-teal-600 to-cyan-600",
  },
];

export const Services: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<number[]>([0, 1, 2]);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCards((prev) => {
        const nextStart = (prev[0] + 3) % services.length;
        return [
          nextStart,
          (nextStart + 1) % services.length,
          (nextStart + 2) % services.length,
        ];
      });
    }, 6000); // Change every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative py-16 bg-gradient-to-br from-gray-900 to-gray-800"
      id="services"
    >
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute w-72 h-72 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 opacity-30 rounded-full blur-3xl"
          animate={{
            x: ["-20%", "120%"],
            y: ["-20%", "20%"],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute w-64 h-64 bg-gradient-to-tr from-blue-500 via-indigo-500 to-purple-500 opacity-30 rounded-full blur-3xl"
          animate={{
            x: ["120%", "-20%"],
            y: ["20%", "-20%"],
            rotate: [0, -360],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-4xl font-bold text-white">Nos Services</h2>
        <p className="text-lg text-gray-300 mt-4">
          Découvrez les solutions que nous proposons pour vous accompagner.
        </p>
      </div>

      {/* Responsive Grid */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-6 sm:px-12 lg:px-20">
        <AnimatePresence>
          {visibleCards.map((index) => {
            const service = services[index];
            return (
              <motion.div
                key={index}
                className={`relative p-8 rounded-xl shadow-2xl overflow-hidden hover:scale-105 transition-transform duration-500 bg-gradient-to-br ${service.gradient}`}
                initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: -10 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                {/* Icon */}
                <div className="z-10 mb-6 flex justify-center">
                  {service.icon}
                </div>
                {/* Title */}
                <h3 className="z-10 text-xl font-bold text-white text-center">
                  {service.title}
                </h3>
                {/* Description */}
                <p className="z-10 mt-4 text-sm text-white text-center">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </section>
  );
};
