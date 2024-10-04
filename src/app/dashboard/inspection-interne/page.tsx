"use client";
import { columnListProjects } from "@/components/atoms/colums-of-tables/listOfProjects";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ProjectType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
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
  const currentCampaign = useCampaignStore((state) => state.campaigns)[0];

  // Fetech all projects xwith ["INTERNAL_INSPECTION"] and pass it as props to layout
  async function fetchAllInternalInspectionProject() {
    if (!currentCampaign && !company) return;
    setIsLoading((prev) => !prev);
    await fetchApiData(
      Route.projects,
      "?type=INTERNAL_INSPECTION",
      currentCampaign?.id
    )
      .then((response) => {
        console.log("all internal_inspection projects", response);
        if (response.status === 200) {
          setInternalInspectionProjects(response.data);
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
  }, [currentCampaign?.id, company?.id]);

  return (
    <LayoutDashboard
      typeOfProject={"INTERNAL_INSPECTION"}
      projectsPerType={
        interanlInspectionProjects?.length
          ? (interanlInspectionProjects as ProjectType[])
          : []
      }
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
    </LayoutDashboard>
  );
}
