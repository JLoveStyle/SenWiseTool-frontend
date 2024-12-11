"use client";
import { useToggle } from "@/hooks/use-toggle";
import { useApiOps } from "@/lib/api-provider";
import { Route } from "@/lib/route";
import { HAS_COMPANY } from "@/lib/session-statut";
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
import { Footer } from "../molecules/footer";
import { FeaturesMenu } from "../organisms/navigationMenu";
import { Session } from "../templates/session";

interface Props {
  children: React.ReactNode;
  newForms?: NewFormProps[];
  formParams?: dasboardFormParams;
  title?: string;
  isCloseModal?: boolean;
  statPanelDatas?: DashboardStatPanelData[];
}

export default function LayoutDashboardTemplate({
  children,
  title,
  newForms,
  formParams,
  statPanelDatas,
  isCloseModal,
}: Props) {
  const campaigns = useCampaignStore((state) => state.campaigns).map(
    (comp) => ({
      label: comp.name,
      id: comp.id,
      baseUrl: "",
    })
  );

  const sortedCampains = campaigns.sort((a, b) =>
    a.label.localeCompare(b.label)
  );

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
      <div className="flex w-screen h-screen overflow-hidden">
        <div className="fixed top-0 left-0 h-full w-[90px] p-2 bg-tertiary border-r-2 text-white">
          <Sidebar options={dashboardSidebarOptions} />
        </div>
        <div className="ml-[90px] w-[calc(100vw-90px)]">
          <div className="fixed top-0 left-[90px] w-[calc(100vw-90px)] z-10">
            <Navbar title={title} />
          </div>
          <div className="mt-[64px] flex">
            {displayCloseSideNav && (
              <div className="fixed top-[64px] left-[90px] z-10">
                <StatPanel
                  isCloseModal={isCloseModal}
                  newForms={newForms}
                  statPanelDatas={statPanelDatas}
                  formParams={formParams}
                />
              </div>
            )}
            <div className="w-full pl-[10px] pt-[64px]">
              <div className="fixed top-[64px] left-[calc(400px)] z-10 w-full">
                <FeaturesMenu />
              </div>
              <div className="overflow-y-auto h-[calc(100vh-64px)] scrool-bar-hidden mb-10">
                {children}
              </div>
            </div>
          </div>
        </div>
        {(newForms || statPanelDatas) && (
          <FloatingButton
            className="rounded-full bg-white text-black"
            positionLeft={70}
            positionTop={480}
            action={toggleDisplayCloseSideNav}
          >
            <HiViewGridAdd />
          </FloatingButton>
        )}
      </div>
      <div className="w-[calc(100vw-90px)] ml-[90px]">
        <Footer />
      </div>
    </Session>
  );
}
