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

export default function Home({ }: Props) {
  const [autoEvalutionProjects, setAutoEvaluationProjects] =
    useState<ProjectType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const company = useCompanyStore((state) => state.company);
  const currentCampaign = useCampaignStore((state) => state.campaigns)[0];

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
        console.log("all initial_inspection projects", response);
        setIsLoading((prev) => !prev);
        setAutoEvaluationProjects(response.data);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading((prev) => !prev);
      });
  }

  console.log('isLoading from autoevaluation', isLoading)

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