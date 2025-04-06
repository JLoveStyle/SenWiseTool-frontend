"use client";
import { columnListProjects } from "@/components/atoms/colums-of-tables/listOfProjects";
import dynamic from "next/dynamic";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ProjectType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import React, { useEffect, useState } from "react";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { DashboardStatPanelData } from "@/types/app-link";
import { Archive, FilePenLine, PenLine, Rocket } from "lucide-react";
import ProjectDetailsForm from "@/components/organisms/projectFormDetails/createForm";

const ProjectDisplay = dynamic(
  () => import("@/components/organisms/projectsDisplay"),
  {
    ssr: false,
  }
);

type Props = {};

export default function Home({}: Props) {
  const [autoEvalutionProjects, setAutoEvaluationProjects] =
    useState<ProjectType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const company = useCompanyStore((state) => state.company);
  const currentCampaign = useCampaignStore((state) => state.currentCampaign);

  // Fetch all projects with type ["AUTO_EVALUATION"] and pass it as props to Layout
  async function fetchAllAutoEvaluationProject() {
    if (!currentCampaign && !company) return;
    setIsLoading((prev) => !prev);
    await fetchApiData(
      Route.projects,
      `?type=AUTO_EVALUATION&campaign_id=${currentCampaign?.id}`,
      ""
    )
      .then((response) => {
        setIsLoading((prev) => !prev);
        const filteredProjects = [];
        for (const data of response.data) {
          if (data.code.length < 5) {
            filteredProjects.push(data);
          }
        }
        setAutoEvaluationProjects(filteredProjects);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading((prev) => !prev);
      });
  }

  useEffect(() => {
    fetchAllAutoEvaluationProject();
  }, [currentCampaign?.id]);

  // filter all deployed projects
  const draftProjects = autoEvalutionProjects?.filter(
    (item) => item.status === "DRAFT"
  );
  const deployedProjects = autoEvalutionProjects?.filter(
    (item) => item.status === "DEPLOYED"
  );
  const archiveProjects = autoEvalutionProjects?.filter(
    (item) => item.status === "ARCHIVED"
  );

  const formParams = {
    trigger_btn_label_form: "Nouveau formulaire",
    construct_form_btn_label: "construire un formulaire",
    existing_form_btn_label: "Utiliser u model pre-definit",
    new_form_title: "Créer un projet (AUTO EVALUATION): Details",
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
      title="AUTO EVALUATION"
      formParams={formParams}
      statPanelDatas={stateInspection}
      newForms={[
        {
          title: "",
          form: (
            <ProjectDetailsForm
              typeOfProject={"AUTO_EVALUATION"}
            />
          ),
        },
      ]}
    >
      <ProjectDisplay
        columnListProjects={columnListProjects}
        projects={
          autoEvalutionProjects?.length
            ? (autoEvalutionProjects as ProjectType[])
            : []
        }
        // projects={[]}
        isLoading={isLoading}
      />
    </LayoutDashboardTemplate>
  );
}
