"use client";
import { useToggle } from "@/hooks/use-toggle";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import {
  ApiDataResponse,
  CampaignType,
  CompanyType,
  PricePlanType,
  ProjectType,
  RequirementType,
  UserType,
} from "@/types/api-types";
import { DashboardSidebarOption } from "@/types/app-link";
import { ProjectClientType } from "@/types/client-types";
import { fetchApiData } from "@/utiles/services/queries";
import React, { useEffect } from "react";
import { BsPersonVcard } from "react-icons/bs";
import { HiViewGridAdd } from "react-icons/hi";
import { IoMdShareAlt } from "react-icons/io";
import {
  RxGithubLogo,
  RxHeart,
  RxLinkedinLogo,
  RxStack,
  RxTwitterLogo,
} from "react-icons/rx";
import FloatingButton from "../atoms/disign-system/floating-button";
import SideNav from "../molecules/sideNav";
import { Session } from "../templates/session";
import CloseSideNav from "./closeSideNav";
import NavDashboard from "./navDashboard";
import { FeaturesMenu } from "./navigationMenu";
type Props = {
  children: React.ReactNode;
  typeOfProject?: ProjectClientType;
  projectsPerType: ProjectType[];
  newForm?: React.ReactNode;
};

export default function LayoutDashboard({
  children,
  typeOfProject,
  projectsPerType,
  newForm,
}: Props) {
  // BUILD AN OBJECT OF SAME TYPE AS APILINK. Bcz details is of type APILINK
  const campaigns = useCampaignStore((state) => state.campaigns).map(
    (comp) => ({
      label: comp.name,
      id: comp.id,
      baseUrl: "",
    })
  );
  // console.log(campaigns)

  // SIDEBAR OPTIONS
  const dashboardSidebarOptions: DashboardSidebarOption[] = [
    {
      option: {
        label: "Campagnes",
        baseUrl: "",
        icon: RxStack,
      },
      details: campaigns,
    },
    {
      option: {
        label: "Followers",
        baseUrl: "",
        icon: RxHeart,
      },
    },
    {
      option: {
        label: "Share to",
        baseUrl: "",
        icon: IoMdShareAlt,
      },
      details: [
        {
          label: "Github",
          baseUrl: "",
          icon: RxGithubLogo,
        },
        {
          label: "Linkedin",
          baseUrl: "",
          icon: RxLinkedinLogo,
        },
        {
          label: "Twitter",
          baseUrl: "",
          icon: RxTwitterLogo,
        },
      ],
    },
    {
      option: {
        label: "Abonnement",
        baseUrl: "",
        icon: BsPersonVcard,
      },
    },
  ];

  useApiOps<CompanyType, ApiDataResponse<CompanyType>>({
    fn: () => fetchApiData(Route.companies, "current"),
    route: Route.companies,
  });
  useApiOps<CampaignType, ApiDataResponse<CampaignType>>({
    fn: () => fetchApiData(Route.campaign, ""),
    route: Route.campaign,
  });

  useApiOps<PricePlanType, ApiDataResponse<PricePlanType>>({
    fn: () => fetchApiData(Route.pricing, "current"),
    route: Route.pricing,
  });


  const { value: displayCloseSideNav, toggle: togglrDisplayCloseSideNav } =
    useToggle({ initial: true });

  return (
    <Session>
      <div className="flex w-screen h-screen absolute overflow-hidden scrool-bar-hidden">
        <div className="h-screen p-2 w-[90px] overflow-hidden bg-tertiary border-r-2 text-white">
          <SideNav options={dashboardSidebarOptions} />
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
                <FeaturesMenu />
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
    </Session>
  );
}
