import React from "react";
import { Logo } from "../atoms/logo";
import { Search } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

type Props = {
  placeholder: string;
};

export default function NavDashboard({ placeholder }: Props) {
  return (
    <div className="flex justify-between px-5 bg-secondary">
      <Logo size="very-large" />
      <div className=" md:border-l-2 my-auto hidden md:flex px-6 w-[600px] md:border-white">
        <div className="input flex text-[#3a3737] bg-white w-[60%] mx-auto md:w-full items-center py-3 px-2 gap-2 ">
          <Search size={20} />
          <input
            type="search"
            placeholder={placeholder}
            className="w-full  outline-none bg-transparent"
          />
        </div>
      </div>
      <UserButton />
    </div>
  );
}
