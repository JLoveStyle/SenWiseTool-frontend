"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import React, { useEffect, useState } from "react";
import { useCompanyStore } from "@/lib/stores/companie-store";
import ProjectDisplay from "@/components/organisms/projectsDisplay";
import { fetchApiData } from "@/utiles/services/queries";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { ProjectType } from "@/types/api-types";

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
      "INSPECTION_INITIAL",
      company?.id,
      currentCampaign?.id
    )
      .then((response) => {
        console.log("all initial_inspection projects", response);
        setIsLoading((prev) => !prev);
        setInitialInspectioProjects(() => {
          if (response.data) {
            return response.data
          } else return []
        });
      })
      .catch((error) => {
        console.log(error);
        setIsLoading((prev) => !prev);
      });
  }

  useEffect(() => {
    fetchAllInitialInspectionProject()
    console.log("initial_inspection");
  }, []);

  console.log('init', initialInspectionProjects)

  return (
    <LayoutDashboard projectsPerType={initialInspectionProjects as ProjectType[]} typeOfProject={"INITIAL_INSPECTION"}>
      <ProjectDisplay
        // projects={initialInspectionProjects as ProjectType[]}
        projects={[]}
        isLoading={isLoading}
      />
    </LayoutDashboard>
  );
}
