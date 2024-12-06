"use client";

import {
  ChartBarIcon,
  ChevronDownIcon,
  CogIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const links = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "Analytics", href: "/analytics", icon: ChartBarIcon },
];

const expandableLinks = [
  {
    name: "Settings",
    icon: CogIcon,
    subLinks: [
      { name: "Profile", href: "/settings/profile" },
      { name: "Account", href: "/settings/account" },
    ],
  },
];

export const Sidebar = () => {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
      className="w-64 bg-light dark:bg-dark shadow-md h-screen"
    >
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Dashboard
        </h2>
        <ul className="mt-6 space-y-2">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                href={link.href}
                className="flex items-center p-3 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <link.icon className="w-6 h-6 mr-3" />
                {link.name}
              </Link>
            </li>
          ))}

          {expandableLinks.map((group, index) => (
            <li key={group.name}>
              <button
                onClick={() => setExpanded(expanded === index ? null : index)}
                className="flex items-center justify-between w-full p-3 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <div className="flex items-center">
                  <group.icon className="w-6 h-6 mr-3" />
                  {group.name}
                </div>
                <ChevronDownIcon
                  className={`w-5 h-5 transform transition-transform ${
                    expanded === index ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              {expanded === index && (
                <motion.ul
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  className="ml-6 space-y-1 overflow-hidden"
                >
                  {group.subLinks.map((subLink) => (
                    <li key={subLink.name}>
                      <Link
                        href={subLink.href}
                        className="block p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        {subLink.name}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </motion.aside>
  );
};
