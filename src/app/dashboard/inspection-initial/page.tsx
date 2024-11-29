"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import React, { useEffect, useState } from "react";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { fetchApiData } from "@/utiles/services/queries";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { ProjectType } from "@/types/api-types";
import { columnListProjects } from "@/components/atoms/colums-of-tables/listOfProjects";
import { Archive, FilePenLine, PenLine, Rocket } from "lucide-react";
import dynamic from "next/dynamic";
import { DashboardStatPanelData } from "@/types/app-link";
import ProjectDetailsForm from "@/components/organisms/projectFormDetails/createForm";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";

const ProjectDisplay = dynamic(
  () => import("@/components/organisms/projectsDisplay"),
  {
    ssr: false,
  }
);

type Props = {};

export default function Home({}: Props) {
  const [initialInspectionProjects, setInitialInspectioProjects] =
    useState<ProjectType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const company = useCompanyStore((state) => state.company);
  const currentCampaign = useCampaignStore((state) => state.currentCampaign);
  // console.log(currentCampaign?.id)

  // Fetch all projects with type "INITIAL_INSPECTION" and pass it as props to Layout
  async function fetchAllInitialInspectionProject() {
    if (!currentCampaign && !company) return;
    await fetchApiData(
      Route.projects,
      `?campaign_id=${currentCampaign?.id}&type=INITIAL_INSPECTION`,
      company?.id
    )
      .then((response) => {
        console.log("all initial_inspection projects", response);
        setIsLoading(false);
        const filteredProjects = []
        for (const data of response.data) {
          if (data.code.length < 5) {
            filteredProjects.push(data)
          }
        }
        setInitialInspectioProjects(filteredProjects);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  // filter all deployed projects
  const draftProjects = initialInspectionProjects?.filter(
    (item) => item?.status === "DRAFT"
  );
  const deployedProjects = initialInspectionProjects?.filter(
    (item) => item?.status === "DEPLOYED"
  );
  const archiveProjects = initialInspectionProjects?.filter(
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
        label: "Deployed",
        baseUrl: "",
        icon: Rocket,
      },
      data: () => {
        return deployedProjects?.length;
      },
    },
    {
      structure: {
        label: "Draft",
        baseUrl: "",
        icon: FilePenLine,
      },
      data: () => {
        return draftProjects?.length;
      },
    },
    {
      structure: {
        label: "Archive",
        baseUrl: "",
        icon: Archive,
      },
      data: () => {
        return archiveProjects?.length;
      },
    },
  ];

  useEffect(() => {
    fetchAllInitialInspectionProject();
    console.log("initial_inspection");
  }, [currentCampaign?.id, company?.id]);

  return (

    <LayoutDashboardTemplate
      title="INITIAL INSPECTION"
      formParams={formParams}
      statPanelDatas={stateInspection}
      newForms={[
        {
          title: "",
          form: (
            <ProjectDetailsForm
              typeOfProject={"INITIAL_INSPECTION"}
              closeModal={() => console.log('')}
            />
          ),
        },
      ]}
    >
      <ProjectDisplay
        projects={
          initialInspectionProjects?.length
            ? (initialInspectionProjects as ProjectType[])
            : []
        }
        isLoading={isLoading}
        columnListProjects={columnListProjects}
      />
    </LayoutDashboardTemplate>
  );
}
