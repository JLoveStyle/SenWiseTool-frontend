"use client";
import { UserButton } from "@clerk/nextjs";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";

type Props = {};

export default function SideNav({}: Props) {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  const campagn: { [key: string]: any }[] = [
    {
      id: "1",
      name: "2022-2023",
    },
    {
      id: "2",
      name: "2023-2024",
    },
    {
      id: 3,
      name: "2024-2025",
    },
    {
      id: "4",
      name: "2025-2026",
    },
    {
      id: "5",
      name: "2026-2027",
    },
    {
      id: "6",
      name: "2027-2028",
    },
    {
      id: "7",
      name: "2028-2029",
    },
  ];

  async function handleCampagneObject(id: string) {
    console.log(id);
    setShowDropDown((prev) => !prev);
  }

  return (
    <div className="bg-tertiary w-fit h-screen px-3 ">
      <div
        onClick={() => setShowDropDown((prev) => !prev)}
        className="flex gap-2 hover:cursor-pointer pt-[87px]"
      >
        <h2 className="font-semibold">CAMPAGNE</h2>
        <ChevronDown
          className={
            showDropDown
              ? "rotate-180 transition-transform duration-500" 
              : "duration-500"
          }
        />
      </div>
      {showDropDown && (
        <div className="z-50 absolute bg-tertiary">
          {campagn.map((item) => (
            <p
              key={item.id}
              onClick={() => handleCampagneObject(item.id)}
              className="hover:bg-white w-full p-2 hover:cursor-pointer"
            >
              {item.name}
            </p>
          ))}
        </div>
      )}
      <div className="flex justify-center absolute bottom-3 left-14 ">
        <UserButton />
      </div>
    </div>
  );
}
