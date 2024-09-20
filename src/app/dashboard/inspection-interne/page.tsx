"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import ProjectDisplay from "@/components/organisms/projectsDisplay";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ProjectType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import React, { useEffect, useState } from "react";

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
      "INSPECTION_INTERN",
      company?.id,
      currentCampaign?.id
    )
      .then((response) => {
        console.log("all initial_inspection projects", response);
        if (response.statusCode.toString().startsWith("2")) {
          setInternalInspectionProjects(() => {
            if (response.data) {
              return response.data
            } else return []
          });
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
    console.log("inspection interne");
  }, []);

  return (
    <LayoutDashboard
      typeOfProject={"INTERNAL_INSPECTION"}
      projectsPerType={interanlInspectionProjects as ProjectType[]}
    >
      <ProjectDisplay
        projects={interanlInspectionProjects as ProjectType[]}
        // projects={[]}
        isLoading={isLoading}
      />
    </LayoutDashboard>
  );
}
