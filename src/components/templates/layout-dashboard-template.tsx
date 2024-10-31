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
import { NewFormProps } from "@/types/dashboard/form";
import { dasboardFormParams } from "@/types/formData";
import { fetchApiData } from "@/utiles/services/queries";
import React, { useEffect } from "react";
import { BsPersonVcard } from "react-icons/bs";
import { FaHandHoldingUsd, FaUsers } from "react-icons/fa";
import { HiViewGridAdd } from "react-icons/hi";
import { IoMdShareAlt } from "react-icons/io";
import {
  RxGithubLogo,
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
import { AUTHENTICATED, HAS_COMPANY } from "@/lib/session-statut";
// import CloseSideNav from "./closeSideNav";
type Props = {
  children: React.ReactNode;
  newForms?: NewFormProps[];
  formParams?: dasboardFormParams;
  title?: string;
  statPanelDatas?: DashboardStatPanelData[];
};

export default function LayoutDashboardTemplate({
  children,
  title,
  newForms,
  formParams,
  statPanelDatas,
}: Props) {
  // BUILD AN OBJECT OF SAME TYPE AS APILINK. Bcz details is of type APILINK
  const campaigns = useCampaignStore((state) => state.campaigns).map(
    (comp) => ({
      label: comp.name,
      id: comp.id,
      baseUrl: "",
    })
  );
  // sort campains
  const sortedCampains = campaigns.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

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
        label: "Agents",
        baseUrl: Route.agents,
        icon: FaUsers,
      },
    },
    {
      option: {
        label: "Markets",
        baseUrl: Route.markets,
        icon: FaHandHoldingUsd,
      },
    },
    {
      option: {
        label: "Share",
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
  }, []);

  const { value: displayCloseSideNav, toggle: toggleDisplayCloseSideNav } =
    useToggle({ initial: newForms || statPanelDatas ? true : false });

  return (
    <Session sessionStatus={HAS_COMPANY}>
      <div className="flex w-screen h-screen absolute overflow-hidden scrool-bar-hidden">
        <div className="h-screen p-2 w-[90px] overflow-hidden bg-tertiary border-r-2 text-white">
          <Sidebar options={dashboardSidebarOptions} />
        </div>
        <div className="w-[calc(100vw-100px)]">
          <Navbar title={title} />
          <div className="flex">
            {displayCloseSideNav && (
              <StatPanel
                newForms={newForms}
                statPanelDatas={statPanelDatas}
                formParams={formParams}
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
        {(newForms || statPanelDatas) && (
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
