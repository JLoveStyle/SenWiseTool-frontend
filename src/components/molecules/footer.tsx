"use client";

import Link from "next/link";
import { useState } from "react";
import { FaFacebook, FaMapMarkerAlt } from "react-icons/fa";
import { FaSkype, FaWhatsapp } from "react-icons/fa6";
import { FiMoon, FiSun } from "react-icons/fi";

export const Footer: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState("fr");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(e.target.value);
    // Logique pour appliquer les changements de langue (ex: i18n)
  };

  return (
    <footer
      className={`relative py-10 px-5 bg-black text-gray-300 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start">
          <img
            src="/images/logo.svg"
            alt="Company Logo"
            className="w-20 h-20 mb-4"
          />
          <h1 className="text-xl font-bold">SenWiseTool</h1>
          <p className="text-sm mt-2 text-center md:text-left">
            Une solution innovante pour un environment durable.
          </p>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold mb-4">Liens rapides</h2>
          <ul className="space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:underline">
                À propos
              </Link>
            </li>
            <li>
              <Link href="/services" className="hover:underline">
                Services
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:underline">
                Tarifs
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline">
                Contactez-nous
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-semibold mb-4">Contactez-nous</h2>
          <p className="text-sm">
            Email :{" "}
            <a
              href="mailto:contact@senwisetool.com"
              className="hover:underline"
            >
              contact@senwisetool.com
            </a>
          </p>
          <p className="text-sm">Téléphone : +237 653 003 828</p>

          {/* Social Links */}
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.facebook.com/SENIMA.Company"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-500"
            >
              <FaFacebook />
            </a>
            <a
              href="https://join.skype.com/invite/cYVLcbeoUJ9J"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-400"
            >
              <FaSkype />
            </a>
            <a
              href="https://wa.me/237653003828"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-pink-500"
            >
              <FaWhatsapp />
            </a>
            <a
              href="https://maps.app.goo.gl/SjaeNgDAy9bxdNwz7"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-blue-600"
            >
              <FaMapMarkerAlt />
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 border-t border-gray-700 pt-4 flex flex-col items-center justify-between md:flex-row">
        {/* Toggle Mode & Language Selector */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-md shadow-md text-sm"
          >
            {darkMode ? (
              <>
                <FiSun className="text-yellow-400" />
                <span>Mode Clair</span>
              </>
            ) : (
              <>
                <FiMoon className="text-gray-300" />
                <span>Mode Sombre</span>
              </>
            )}
          </button>

          {/* Language Selector */}
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-gray-800 text-gray-300 border border-gray-700 px-4 py-2 rounded-md text-sm"
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>

        <p className="text-xs mt-4 md:mt-0">
          &copy; {new Date().getFullYear()} Senima Company. Tous droits
          réservés.
        </p>
      </div>
    </footer>
  );
};
