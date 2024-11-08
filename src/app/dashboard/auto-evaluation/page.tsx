"use client";
import { columnListProjects } from "@/components/atoms/colums-of-tables/listOfProjects";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import dynamic from "next/dynamic";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ProjectType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import React, { useEffect, useState } from "react";

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
      "?type=AUTO_EVALUATION",
      currentCampaign?.id
    )
      .then((response) => {
        setIsLoading((prev) => !prev);
        const filteredProjects = []
        for (const data of response.data) {
          if (data.code.length < 5) {
            filteredProjects.push(data)
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
    console.log("Auto-evaluation");
    fetchAllAutoEvaluationProject();
  }, [currentCampaign?.id]);

  return (
    <LayoutDashboard
      projectsPerType={
        autoEvalutionProjects?.length
          ? (autoEvalutionProjects as ProjectType[])
          : []
      }
      typeOfProject={"AUTO_EVALUATION"}
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
    </LayoutDashboard>
  );
}
