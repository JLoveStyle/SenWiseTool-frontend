"use client";

import { cardDataPricing, getChapterById } from "@/lib/card-data";
import { Route } from "@/lib/route";
import { chapterList, formatPrice } from "@/utils/format-price";
import { motion } from "framer-motion";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ButtonUI } from "../atoms/disign-system/button-ui";

export const Pricing: React.FC = () => {
  const [planChoosed, setPlanChoosed] = useState<string | null>(null);

  const choosePlan = (plan: string) => {
    setPlanChoosed(plan);

    toast(`${plan} Plan Selected`);
  };
  return (
    <section
      className="py-12 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"
      id="pricing"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
          Our Pricing Plans
        </h2>
        <p className="text-lg text-gray-500 dark:text-gray-400 mt-4">
          Choisissez le plan qui correspond à vos besoins.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-8">
        {cardDataPricing.map((plan, index) => (
          <motion.div
            key={plan.type}
            className={`relative p-8 rounded-xl w-72 md:w-80 text-center ${plan.color} ${plan.textColor} shadow-lg ${plan.shadow} hover:scale-105 transition-transform duration-500 dark:shadow-none`}
            whileHover={{ scale: 1.1 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: index * 0.2,
            }}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 opacity-10 pointer-events-none"
              style={{
                backgroundImage: `url(${plan.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            {/* Icon */}
            <div className="z-10">{plan.icon}</div>

            {/* Badge */}
            <div
              className={`z-10 absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-white dark:bg-gray-800 shadow-md text-sm font-bold ${
                index === 0
                  ? "text-yellow-800 dark:text-yellow-400"
                  : index === 1
                  ? "text-gray-900 dark:text-gray-300"
                  : "text-orange-900 dark:text-orange-400"
              }`}
            >
              {plan.type} Plan
            </div>

            {/* Price */}
            <div className="z-10 mt-8">
              <h3 className="text-3xl font-extrabold text-black">
                {plan.type}
              </h3>
              <div className="relative inline-block mt-4">
                <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-gray-500 via-black to-gray-400 bg-clip-text dark:from-gray-300 dark:via-violet-400 dark:to-purple-500">
                  {formatPrice(plan.annualPricing)} /Year
                </p>
                {/* Pseudo-élément pour le motif */}
                <div className="absolute inset-0 bg-[url('/images/logo.png')] bg-repeat bg-size-200 opacity-20 pointer-events-none"></div>
              </div>
            </div>

            <div className="text-center mt-8 mb-5 text-sm text-gray-800 dark:text-gray-300 italic">
              {plan?.condition?.description}
            </div>

            {/* Features */}
            <div className="z-10 mt-6 space-y-4 text-xs text-start text-gray-800 dark:text-dark">
              {chapterList(plan.chapters).map((chapter, idx) => (
                <>
                  {plan?.condition && idx != 0 && (
                    <div className="divide-y divide-gray-300 dark:divide-gray-700 w-full">
                      <div className="relative flex items-center justify-center my-5">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
                        </div>
                        <div className="relative bg-white dark:bg-gray-800 px-4 text-gray-500 dark:text-gray-400">
                          {plan?.condition?.badge}
                        </div>
                      </div>
                    </div>
                  )}
                  <div key={idx}>
                    <span className="font-bold mr-2">
                      {getChapterById(chapter)?.title} :
                    </span>
                    <span>{getChapterById(chapter)?.description}</span>
                  </div>
                </>
              ))}
            </div>

            {/* Action Button */}
            <Link href={`${Route.checkout}/${plan.type}`} className="z-1000">
              <ButtonUI
                className="z-1000 mt-6 px-5 py-2 bg-white dark:bg-black text-gray-900 dark:text-white rounded-md font-semibold shadow-md hover:bg-gray-200 dark:hover:bg-gray-600"
                action={() => choosePlan(plan.type)}
                isLoading={plan.type === planChoosed ? true : false}
              >
                Choose {plan.type}
              </ButtonUI>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
