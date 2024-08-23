import React from "react";
import NavDashboard from "../molecules/navDashboard";
import { Route } from "@/lib/route";
import { LibraryBig, Sheet } from "lucide-react";
import SideNav from "../molecules/sideNav";
import { NavigationMenuDemo } from "./navigationMenu";

type Props = {
  children?: React.ReactNode;
};

export default function LayoutDashboard({ children }: Props) {
  return (
    <div>
      <NavDashboard placeholder="Recherche..." />
      <div className="flex">
        <SideNav />
        {/* <p className="pt-24"> snduvsdvs sdbvuos vqdvn</p> */}
        <div className="pt-20">
          <NavigationMenuDemo />
        </div>
      </div>
      {/* <div className="bg-secondary h-screen w-16  ">
        <div className="flex flex-col gap-8 ml-3">
          <Sheet />
          <LibraryBig />
        </div>
      </div> */}
      <div className="">{children}</div>
    </div>
  );
}
