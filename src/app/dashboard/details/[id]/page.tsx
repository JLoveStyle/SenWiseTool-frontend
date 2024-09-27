"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import ProjectDetails from "@/components/organisms/projectDetails";
import { Route } from "@/lib/route";
import { ProjectType } from "@/types/api-types";
import { fetchApiData } from "@/utiles/services/queries";
import React, { useEffect, useState } from "react";

type Props = {
  params: {
    id: string;
  }
};

export default function Home({ params: { id } }: Props) {
  // Fetch all projects with type ["INTERNAL_INSPECTION"] and pass it as props to Layout

  const [projectData, setProjectData] = useState<ProjectType>();
  console.log('id =>', id)

  const fecthDetailProjectData = async () => {
    const rest = await fetchApiData(
      Route.projects,
      id
    );

    if (typeof rest.data != 'undefined') {
      setProjectData(rest.data)
    }
  }


  useEffect(() => {
    fecthDetailProjectData()
  }, [Route.projects, id]);

  return (
    <LayoutDashboard
      projectsPerType={[]} // not usefull here coz the closeSideNav is not displayed on this page
      typeOfProject={"INTERNAL_INSPECTION"} // not usefull on this page
    >
      <ProjectDetails projectDetails={projectData as ProjectType} />
    </LayoutDashboard>
  );
}