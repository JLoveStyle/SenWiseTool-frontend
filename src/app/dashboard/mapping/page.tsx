"use client";
import { mappingColumnListProjects } from "@/components/organisms/mapping/mappingProjectColumns";
import ProjectDetailsForm from "@/components/organisms/projectFormDetails/createForm";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { ProjectType } from "@/types/api-types";
import { DashboardStatPanelData } from "@/types/app-link";
import { fetchApiData } from "@/utiles/services/queries";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import { Archive, FilePenLine, PenLine, Rocket } from "lucide-react";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const ProjectDisplay = dynamic(
  () => import("@/components/organisms/projectsDisplay"),
  {
    ssr: false,
  }
);

type Props = {};

export default function Home({}: Props) {
  const [allMappingProjects, setAllMappingProjects] =
    useState<Partial<ProjectType[]>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const company = LOCAL_STORAGE.get("company")
  const currentCampaign = useCampaignStore((state) => state.currentCampaign);

  // get all mapping projects
  async function fetchAllMappingProjects() {
    if (!currentCampaign && !company) return;
    setIsLoading((prev) => !prev);
    await fetchApiData(Route.projects, "?type=MAPPING", currentCampaign?.id)
      .then((response) => {
        setIsLoading((prev) => !prev);
        const filteredProjects = [];
        for (const data of response.data) {
          if (data.code.length < 5) {
            filteredProjects.push(data);
          }
        }
        setAllMappingProjects(filteredProjects);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading((prev) => !prev);
      });
  }

  useEffect(() => {
    fetchAllMappingProjects();
  }, [currentCampaign?.id, company?.id]);

  // filter all deployed projects
  const draftProjects = allMappingProjects?.filter(
    (item) => item?.status === "DRAFT"
  );
  const deployedProjects = allMappingProjects?.filter(
    (item) => item?.status === "DEPLOYED"
  );
  const archiveProjects = allMappingProjects?.filter(
    (item) => item?.status === "ARCHIVED"
  );

  const formParams = {
    trigger_btn_label_form: "New Form",
    construct_form_btn_label: "Construct a form",
    existing_form_btn_label: "Use a pre-defined model",
    new_form_title: "Create a MAPPING project: Project details",
    construct_form_btn_icon: PenLine,
  };

  const stateInspection: DashboardStatPanelData[] = [
    {
      structure: {
        label: "Deployé",
        baseUrl: "",
        icon: Rocket,
      },
      data: () => {
        return deployedProjects?.length;
      },
    },
    {
      structure: {
        label: "Brouillon",
        baseUrl: "",
        icon: FilePenLine,
      },
      data: () => {
        return draftProjects?.length;
      },
    },
    {
      structure: {
        label: "Archivé",
        baseUrl: "",
        icon: Archive,
      },
      data: () => {
        return archiveProjects?.length;
      },
    },
  ];

  return (
    <LayoutDashboardTemplate
      title="MAPPING"
      formParams={formParams}
      statPanelDatas={stateInspection}
      newForms={[
        {
          title: "",
          form: (
            <ProjectDetailsForm
              typeOfProject={"MAPPING"}
            />
          ),
        },
      ]}
    >
      <ProjectDisplay
        projects={
          allMappingProjects?.length
            ? (allMappingProjects as ProjectType[])
            : []
        }
        isLoading={isLoading}
        columnListProjects={mappingColumnListProjects}
      />
    </LayoutDashboardTemplate>

  );
}
