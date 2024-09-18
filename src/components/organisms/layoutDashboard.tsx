"use client";
import React, { useEffect } from "react";
import NavDashboard from "./navDashboard";
import SideNav from "../molecules/sideNav";
import { NavigationMenuDemo } from "./navigationMenu";
import { Project } from "@/types/gestion";
import CloseSideNav from "./closeSideNav";
import { ProjectClientType } from "@/types/client-types";
import { ApiDataResponse, CampaignType, CompanyType, UserType } from "@/types/api-types";
import { useUserstore } from "@/lib/stores/user-stores";
import { fetchApiData } from "@/utiles/services/queries";
import { useApiOps } from "@/lib/api-provider";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { Route } from "@/lib/route";
type Props = {
  children: React.ReactNode;
  typeOfProject?: [ProjectClientType]
  projectsPerType: Project[];
};

export default function LayoutDashboard({
  children,
  typeOfProject,
  projectsPerType,
}: Props) {

  const campaigns = useCampaignStore((state) => state.campaigns);
  const { refetch } = useApiOps<
    CampaignType,
    ApiDataResponse<CampaignType>
  >({
    fn: () => fetchApiData(Route.campaign, ""),
    route: Route.campaign,
  });
  useEffect(() => {
    refetch();
  }, [])

  return (
    <div className="">
      <NavDashboard />
      <div className="flex ">
        <SideNav campaigns={campaigns} />
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
