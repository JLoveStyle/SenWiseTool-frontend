import React from "react";
import NavDashboard from "../molecules/navDashboard";
import { Route } from "@/lib/route";
import { LibraryBig, Sheet } from "lucide-react";

type Props = {
  children?: React.ReactNode;
};

export default function LayoutDashboard({ children }: Props) {
  const sideIcons: { [key: string]: any }[] = [
    {
      path: `${Route.dashboard}/pojects`,
      icon: <Sheet />,
    },
  ];

  return (
    <div>
      <NavDashboard placeholder="Recherche..." />
      <div className="bg-secondary h-screen w-16  ">
        <div className="flex flex-col gap-8 ml-3">
          <Sheet />
          <LibraryBig />
        </div>
      </div>
      <div className="">{children}</div>
    </div>
  );
}
