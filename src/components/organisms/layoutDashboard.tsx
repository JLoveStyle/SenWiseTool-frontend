import React from "react";
import NavDashboard from "../molecules/navDashboard";
import SideNav from "../molecules/sideNav";
import { NavigationMenuDemo } from "./navigationMenu";
import InspectionInterneSideNav from "./inspectionInterneSideNav";

type Props = {
  children: React.ReactNode;
};

export default function LayoutDashboard({ children }: Props) {
  return (
    <div className="">
      <NavDashboard placeholder="Recherche..." />
      <div className="flex">
        <SideNav />
        <InspectionInterneSideNav />
        <div className="w-full">
          <div className="px-6 pt-20 pb-3">
            <NavigationMenuDemo />
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
