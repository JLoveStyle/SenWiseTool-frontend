"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import React, { useEffect, useState } from "react";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { fetchApiData } from "@/utiles/services/queries";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { ProjectType } from "@/types/api-types";
import { columnListProjects } from "@/components/atoms/colums-of-tables/listOfProjects";
import dynamic from "next/dynamic";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const company = useCompanyStore((state) => state.company);
  const currentCampaign = useCampaignStore((state) => state.currentCampaign);

  // Fetch all projects with type "INITIAL_INSPECTION" and pass it as props to Layout
  async function fetchAllInitialInspectionProject() {
    if (!currentCampaign && !company) return;
    setIsLoading((prev) => !prev);
    await fetchApiData(
      Route.projects,
      "?type=INITIAL_INSPECTION",
      currentCampaign?.id
    )
      .then((response) => {
        console.log("all initial_inspection projects", response);
        setIsLoading((prev) => !prev);
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
        setIsLoading((prev) => !prev);
      });
  }

  useEffect(() => {
    fetchAllInitialInspectionProject();
    console.log("initial_inspection");
  }, [currentCampaign?.id, company?.id]);

  return (
    <LayoutDashboard
      projectsPerType={
        initialInspectionProjects?.length
          ? (initialInspectionProjects as ProjectType[])
          : []
      }
      typeOfProject={"INITIAL_INSPECTION"}
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
    </LayoutDashboard>
  );
}
