"use client";

import Sidebar from "@/components/atoms/dashboard/sidebar";
import { Navbar } from "@/components/molecules/navbar";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export const LayoutDashboardCustom = ({ children }: Props) => {
  return (
    <div className="flex h-screen">
      <Sidebar options={[]} />
      <div className="flex flex-col flex-1">
        <Navbar />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 overflow-y-auto bg-light dark:bg-dark"
        >
          {children}
        </motion.main>
      </div>
    </div>
  );
};
