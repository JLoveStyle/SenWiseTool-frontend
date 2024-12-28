"use client";
import { columnListProjects } from "@/components/atoms/colums-of-tables/listOfProjects";
import ProjectDetailsForm from "@/components/organisms/projectFormDetails/createForm";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ProjectType } from "@/types/api-types";
import { DashboardStatPanelData } from "@/types/app-link";
import { fetchApiData } from "@/utiles/services/queries";
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
  const [interanlInspectionProjects, setInternalInspectionProjects] =
    useState<ProjectType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const company = useCompanyStore((state) => state.company);
  const currentCampaign = useCampaignStore((state) => state.currentCampaign);

  // Fetech all projects xwith ["INTERNAL_INSPECTION"] and pass it as props to layout
  async function fetchAllInternalInspectionProject() {
    if (!currentCampaign && !company) return;
    setIsLoading((prev) => !prev);
    await fetchApiData(
      Route.projects,
      `?type=INTERNAL_INSPECTION&campaign_id=${currentCampaign?.id}`,
      ""
    )
      .then((response) => {
        console.log("all internal_inspection projects", response);
        if (response.status === 200) {
          const filteredProjects = [];
          for (const data of response.data) {
            if (data.code.length < 5) {
              filteredProjects.push(data);
            }
          }
          setInternalInspectionProjects(filteredProjects);
        }
        setIsLoading((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading((prev) => !prev);
      });
  }

  useEffect(() => {
    fetchAllInternalInspectionProject();
  }, [currentCampaign?.id, company?.id]);

  // filter all deployed projects
  const draftProjects = interanlInspectionProjects?.filter(
    (item) => item?.status === "DRAFT"
  );
  const deployedProjects = interanlInspectionProjects?.filter(
    (item) => item?.status === "DEPLOYED"
  );
  const archiveProjects = interanlInspectionProjects?.filter(
    (item) => item?.status === "ARCHIVED"
  );

  const formParams = {
    trigger_btn_label_form: "New Form",
    construct_form_btn_label: "Construct a form",
    existing_form_btn_label: "Use a pre-defined model",
    new_form_title: "Create a project (INTERNAL INSPECTION): Project details",
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
      title="INSPECTION INTERNE"
      formParams={formParams}
      statPanelDatas={stateInspection}
      newForms={[
        {
          title: "",
          form: (
            <ProjectDetailsForm
              typeOfProject={"INTERNAL_INSPECTION"}
              closeModal={() => console.log('')}
            />
          ),
        },
      ]}
    >
      <ProjectDisplay
        projects={
          interanlInspectionProjects?.length
            ? (interanlInspectionProjects as ProjectType[])
            : []
        }
        // projects={[]}
        isLoading={isLoading}
        columnListProjects={columnListProjects}
      />
    </LayoutDashboardTemplate>
  );
}
