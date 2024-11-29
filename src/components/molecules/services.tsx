"use client";

import { motion } from "framer-motion";
import React from "react";
import { FaChartLine, FaDatabase, FaRoute, FaSeedling } from "react-icons/fa";

const services = [
  {
    title: "Gestion des Cultures",
    description:
      "Optimisez vos récoltes avec un suivi précis et des recommandations personnalisées.",
    icon: <FaSeedling className="text-emerald-500 text-6xl" />,
    lightBg:
      "bg-gradient-to-br from-emerald-200 via-emerald-300 to-emerald-400",
    darkBg: "bg-gradient-to-br from-emerald-700 via-emerald-600 to-emerald-500",
  },
  {
    title: "Stockage des Données",
    description:
      "Organisez et surveillez vos équipements agricoles efficacement.",
    icon: <FaDatabase className="text-yellow-500 text-6xl" />,
    lightBg: "bg-gradient-to-br from-yellow-200 via-yellow-300 to-yellow-400",
    darkBg: "bg-gradient-to-br from-yellow-700 via-yellow-600 to-yellow-500",
  },
  {
    title: "Analyse de Performance",
    description:
      "Prenez des décisions éclairées grâce à des rapports d’analyse détaillés.",
    icon: <FaChartLine className="text-blue-500 text-6xl" />,
    lightBg: "bg-gradient-to-br from-blue-200 via-blue-300 to-blue-400",
    darkBg: "bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500",
  },
  {
    title: "Traçabilité du processus",
    description:
      "Assurez un arrosage optimal pour vos cultures tout en économisant de l'eau.",
    icon: <FaRoute className="text-teal-500 text-6xl" />,
    lightBg: "bg-gradient-to-br from-teal-200 via-teal-300 to-teal-400",
    darkBg: "bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500",
  },
];

export const Services: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="services">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-800 dark:text-gray-100">
          Nos Services
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-4">
          Découvrez les solutions que nous proposons pour vous accompagner.
        </p>
      </div>

      {/* Services Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 sm:px-12 lg:px-20">
        {services.map((service, index) => (
          <motion.div
            key={index}
            className={`relative p-8 rounded-lg shadow-lg overflow-hidden text-gray-800 dark:text-gray-100 hover:scale-105 transition-transform duration-500 ${service.lightBg} dark:${service.darkBg}`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            {/* Icon */}
            <div className="z-10 mb-6">{service.icon}</div>

            {/* Title */}
            <h3 className="z-10 text-xl font-bold">{service.title}</h3>

            {/* Description */}
            <p className="z-10 mt-4 text-sm">{service.description}</p>

            {/* Decorative Lines */}
            <div className="absolute inset-0 z-0">
              <motion.div
                className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white to-transparent dark:via-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              ></motion.div>
              <motion.div
                className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-transparent via-white to-transparent dark:via-gray-700"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              ></motion.div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
