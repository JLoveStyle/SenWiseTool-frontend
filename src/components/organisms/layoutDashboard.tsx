import React from "react";
import NavDashboard from "./navDashboard";
import SideNav from "../molecules/sideNav";
import { NavigationMenuDemo } from "./navigationMenu";
import { Project } from "@/types/gestion";
import CloseSideNav from "./closeSideNav";

type Props = {
  children: React.ReactNode;
  typeOfProject: [
    "INTERNAL_INSPECTION" | "INITIAL_INSPECTION" | "AUTO_EVALUATION"
  ];
  projectsPerType: Project[];
};

export default function LayoutDashboard({
  children,
  typeOfProject,
  projectsPerType,
}: Props) {
  return (
    <div className="">
      <NavDashboard />
      <div className="flex ">
          <SideNav />
          <CloseSideNav
            projectsPerType={projectsPerType}
            typeOfProject={typeOfProject}
          />
        <div className="w-full ">
          <div className="px-6 pt-20 pb-3 ">
            <NavigationMenuDemo />
          </div>
          <div className="overflow-y-auto ">{children}</div>
        </div>
      </div>
    </div>
  );
}
