"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import { mappingColumnListProjects } from "@/components/organisms/mapping/mappingProjectColumns";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ProjectType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
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
  const company = useCompanyStore((state) => state.company);
  const currentCampaign = useCampaignStore((state) => state.currentCampaign);

  // get all mapping projects
  async function fetchAllMappingProjects() {
    if (!currentCampaign && !company) return;
    setIsLoading((prev) => !prev);
    await fetchApiData(Route.projects, "?type=MAPPING", currentCampaign?.id)
      .then((response) => {
        console.log("all mapping projects", response);
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

  // const mappingProjects = LOCAL_STORAGE.get("mappingProjects").slice(2, 50)
  // console.log(mappingProjects)

  useEffect(() => {
    fetchAllMappingProjects();
  }, [currentCampaign?.id, company?.id]);

  return (
    <LayoutDashboard
      projectsPerType={
        allMappingProjects?.length ? (allMappingProjects as ProjectType[]) : []
      }
      typeOfProject={"MAPPING"}
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
    </LayoutDashboard>
  );
}
