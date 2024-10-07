"use client";
import { useToggle } from "@/hooks/use-toggle";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { ApiDataResponse, CampaignType, CompanyType } from "@/types/api-types";
import {
  DashboardSidebarOption,
  DashboardStatPanelData,
} from "@/types/app-link";
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
import Navbar from "../atoms/dashboard/navbar";
import Sidebar from "../atoms/dashboard/sidebar";
import StatPanel from "../atoms/dashboard/stat-panel";
import FloatingButton from "../atoms/disign-system/floating-button";
import { FeaturesMenu } from "../organisms/navigationMenu";
import { Session } from "../templates/session";
import { useSession } from "@clerk/nextjs";
// import CloseSideNav from "./closeSideNav";
type Props = {
  children: React.ReactNode;
  newForm?: React.ReactNode;
  title?: string;
  statPanelDatas?: DashboardStatPanelData[];
};

export default function LayoutDashboardTemplate({
  children,
  title,
  newForm,
  statPanelDatas,
}: Props) {
  // GET SESSION ID from clerk
  const { session } = useSession();

  // BUILD AN OBJECT OF SAME TYPE AS APILINK. Bcz details is of type APILINK
  const campaigns = useCampaignStore((state) => state.campaigns).map(
    (comp) => ({
      label: comp.name,
      id: comp.id,
      baseUrl: "",
    })
  );

  // Sort all campains in ASC order
  const sortedCampains = campaigns.sort((a, b) => a.label.localeCompare(b.label))

  // console.log(campaigns)

  // SIDEBAR OPTIONS
  const dashboardSidebarOptions: DashboardSidebarOption[] = [
    {
      option: {
        label: "Campagnes",
        baseUrl: "",
        icon: RxStack,
      },
      details: sortedCampains,
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

  const { refetch } = useApiOps<CampaignType, ApiDataResponse<CampaignType>>({
    fn: () => fetchApiData(Route.campaign, ""),
    route: Route.campaign,
  });

  useEffect(() => {
    refetch();
  }, [session?.id]);

  const { value: displayCloseSideNav, toggle: toggleDisplayCloseSideNav } =
    useToggle({ initial: newForm || statPanelDatas ? true : false });

  return (
    <Session>
      <div className="flex w-screen h-screen absolute overflow-hidden scrool-bar-hidden">
        <div className="h-screen p-2 w-[90px] overflow-hidden bg-tertiary border-r-2 text-white">
          <Sidebar options={dashboardSidebarOptions} />
        </div>
        <div className="w-[calc(100vw-100px)]">
          <Navbar title={title} />
          <div className="flex">
            {displayCloseSideNav && (
              <StatPanel newForm={newForm} statPanelDatas={statPanelDatas} />
            )}
            <div className="w-full ">
              <div className="px-6 pt-1 pb-3 flex justify-center items-center">
                <FeaturesMenu />
              </div>
              <div className="overflow-y-auto">{children}</div>
            </div>
          </div>
        </div>
        {(newForm || statPanelDatas) && (
          <FloatingButton
            className="rounded-full bg-white text-black"
            positionLeft={70}
            positionTop={400}
            action={toggleDisplayCloseSideNav}
          >
            <HiViewGridAdd />
          </FloatingButton>
        )}
      </div>
    </Session>
  );
}
