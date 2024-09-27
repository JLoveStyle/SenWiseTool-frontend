"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import { mappingColumnListProjects } from "@/components/organisms/mapping/mappingProjectColimns";
import ProjectDisplay from "@/components/organisms/projectsDisplay";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ProjectType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import React, { useEffect, useState } from "react";

type Props = {};

export default function Home({}: Props) {
  const [allMappingPaojects, setAllMappingProjects] =
    useState<Partial<ProjectType[]>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const company = useCompanyStore((state) => state.company);
  const currentCampaign = useCampaignStore((state) => state.campaigns)[0];

  // get all mapping projects
  async function fetchAllMappingProjects() {
    if (!currentCampaign && !company) return;
    setIsLoading((prev) => !prev);
    await fetchApiData(Route.projects, "?type=MAPPING", currentCampaign?.id)
      .then((response) => {
        console.log("all mapping projects", response);
        setIsLoading((prev) => !prev);
        setAllMappingProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading((prev) => !prev);
      });
  }

  const mappingProjects = LOCAL_STORAGE.get("mappingProjects").slice(2, 9)
  console.log(mappingProjects)


  useEffect(() => {
    fetchAllMappingProjects();
  }, []);

  return (
    <LayoutDashboard
      projectsPerType={
        allMappingPaojects?.length ? (allMappingPaojects as ProjectType[]) : []
      }
      typeOfProject={"MAPPING"}
    >
      <ProjectDisplay
        // projects={
        //   allMappingPaojects?.length
        //     ? (allMappingPaojects as ProjectType[])
        //     : []
        // }
        projects={mappingProjects as ProjectType[]}
        isLoading={isLoading}
        columnListProjects={mappingColumnListProjects}
      />
    </LayoutDashboard>
  );
}
