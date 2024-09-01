import React from "react";
import CloseSideNav from "../molecules/closeSideNav";
import NavDashboard from "../molecules/navDashboard";
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
        <CloseSideNav />
        <div className="pl-5">
          <div className="pt-20 ">
            <NavigationMenuDemo />
          </div>
          <div className="">{children}</div>
        </div>
      </div>
    </div>
  );
}
