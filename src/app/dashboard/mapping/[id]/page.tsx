"use client"
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import ProjectDetails from "@/components/organisms/projectDetails";
import LayoutDashboardTemplate from "@/components/templates/layout-dashboard-template";
import { Route } from "@/lib/route";
import { useCampaignStore } from "@/lib/stores/campaign-store";
import { useCompanyStore } from "@/lib/stores/companie-store";
import { ProjectType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import React, { use, useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";

type Props = Promise<{id: string}>

export default function Home(props: {params: Props}) {
  const params = use(props.params)
  const id = params.id
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const currentCampaign = useCampaignStore((state) => state.campaigns)[0];
  const [projectObject, setProjectObject] = useState<ProjectType>();

  // FETCH PROJECT BY ID
  async function fetchProjectById() {
    // setIsLoading((prev) => !prev);

    await fetchApiData(Route.projects, id)
      .then((response) => {
        console.log("mappingproject per Id", response);
        if (response.status === 200) {
          setIsLoading((prev) => !prev);
          setProjectObject(response.data);
          return
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
    fetchProjectById()
  }, [])

  return (

    <LayoutDashboardTemplate title="MAPPING">
      <ProjectDetails isDataLoading={isLoading} projectDetails={projectObject as ProjectType} />
    </LayoutDashboardTemplate>
  );
}
