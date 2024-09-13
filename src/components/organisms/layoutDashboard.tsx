import { useToggle } from "@/hooks/use-toggle";
import { DashboardSidebarOptions } from "@/types/dashboard-data";
import { Project } from "@/types/gestion";
import React from "react";
import { HiViewGridAdd } from "react-icons/hi";
import FloatingButton from "../atoms/disign-system/floating-button";
import SideNav from "../molecules/sideNav";
import CloseSideNav from "./closeSideNav";
import NavDashboard from "./navDashboard";
import { NavigationMenuDemo } from "./navigationMenu";

type Props = {
  children: React.ReactNode;
  typeOfProject?: [
    | "INTERNAL_INSPECTION"
    | "INITIAL_INSPECTION"
    | "AUTO_EVALUATION"
    | "TRAINING"
  ];
  projectsPerType: Project[];
  newForm?: React.ReactNode;
};

export default function LayoutDashboard({
  children,
  typeOfProject,
  projectsPerType,
  newForm,
}: Props) {
  const { value: displayCloseSideNav, toggle: togglrDisplayCloseSideNav } =
    useToggle({ initial: true });

  return (
    <div className="flex w-screen h-screen absolute overflow-hidden scrool-bar-hidden">
      <div className="h-screen p-2 w-[90px] overflow-hidden bg-tertiary border-r-2">
        <SideNav options={DashboardSidebarOptions} />
      </div>
      <div className="w-[calc(100vw-100px)]">
        <NavDashboard />
        <div className="flex">
          {displayCloseSideNav && (
            <CloseSideNav
              projectsPerType={projectsPerType}
              typeOfProject={typeOfProject}
              newForm={newForm}
            />
          )}
          <div className="w-full ">
            <div className="px-6 pt-1 pb-3 flex justify-center items-center">
              <NavigationMenuDemo />
            </div>
            <div className="overflow-y-auto">{children}</div>
          </div>
        </div>
      </div>
      {/* {newForm && ( */}
      <FloatingButton
        className="rounded-full bg-white text-black"
        positionLeft={70}
        positionTop={400}
        action={togglrDisplayCloseSideNav}
      >
        <HiViewGridAdd />
      </FloatingButton>
      {/* )} */}
    </div>
  );
}
