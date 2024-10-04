"use client";
import React, { useEffect } from "react";
import NavDashboard from "./navDashboard";
import SideNav from "../molecules/sideNav";
import { NavigationMenuDemo } from "./navigationMenu";
import { useToggle } from "@/hooks/use-toggle";
import { HiViewGridAdd } from "react-icons/hi";
import FloatingButton from "../atoms/disign-system/floating-button";
import CloseSideNav from "./closeSideNav";
import {
  ApiDataResponse,
  CampaignType,
  CompanyType,
  ProjectsType,
  ProjectType,
} from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import { useApiOps } from "@/lib/api-provider";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { Route } from "@/lib/route";
import { DashboardSidebarOption } from "@/types/app-link";
import {
  RxGithubLogo,
  RxHeart,
  RxLinkedinLogo,
  RxStack,
  RxTwitterLogo,
} from "react-icons/rx";
import { IoMdShareAlt } from "react-icons/io";
import { BsPersonVcard } from "react-icons/bs";
import { useSession } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
  typeOfProject: ProjectsType;
  projectsPerType: ProjectType[];
  newForm?: React.ReactNode;
};

export default function LayoutDashboard({
  children,
  typeOfProject,
  projectsPerType,
  newForm,
}: Props) {
  
  // Session object from clerk
  const { session } = useSession();

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

  // FETCH CURRENT company
  const { refetch } = useApiOps<CompanyType, ApiDataResponse<CompanyType>>({
    fn: () => fetchApiData(Route.companies, "current"),
    route: Route.companies,
  });

  // FETCH ALL CAMPAINS
  useApiOps<CampaignType, ApiDataResponse<CampaignType>>({
    fn: () => fetchApiData(Route.campaign, ""),
    route: Route.campaign,
  });
  useEffect(() => {
    refetch();
    console.log('layoudashboard component rendered in useEffect')
  }, [session?.id]);

  const { value: displayCloseSideNav, toggle: togglrDisplayCloseSideNav } =
    useToggle({ initial: true });

  return (
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
              <NavigationMenuDemo />
            </div>
            <div className="overflow-y-auto max-h-[calc(100vh-130px)] overflow-hidden">
              {children}
            </div>
          </div>
        </div>
      </div>
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
