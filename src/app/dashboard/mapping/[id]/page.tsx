"use client"
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import ProjectDetails from "@/components/organisms/projectDetails";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ProjectType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import React, { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

type Props = {
  params: {
    id: string;
  };
};

export default function Home({ params: { id } }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentCampaign = useCampaignStore((state) => state.campaigns)[0];
  const [projectObject, setProjectObject] = useState<ProjectType>();

  // FETCH PROJECT BY ID
  async function fetchProjectById() {
    setIsLoading((prev) => !prev);

    await fetchApiData(Route.projects, id)
      .then((response) => {
        console.log("mappingproject per Id", response);
        if (response.status.startsWith("2")) {
          setIsLoading((prev) => !prev);
          setProjectObject(response.data);
        }
        toast.error("Something went wrong", {
          transition: Bounce,
          autoClose: 3000,
        });
      })
      .catch((error) => {
        console.log("could not fetch mapping projects", error);
        setIsLoading((prev) => !prev);
        toast.error("Something went wrong. Please try again", {
          transition: Bounce,
          autoClose: 3000,
        });
      });
  }

  useEffect(() => {
    // fetchProjectById()
  }, [])

  return (
    <LayoutDashboard typeOfProject={"MAPPING"} projectsPerType={[]}>
      <ProjectDetails projectDetails={projectObject as ProjectType} />

    </LayoutDashboard>
  );
}
