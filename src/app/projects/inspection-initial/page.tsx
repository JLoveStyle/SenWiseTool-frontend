"use client";
import ProjectDisplay from "@/components/organisms/projectsDisplay";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import React, { useEffect } from "react";
import { tableRaw } from "@/utiles/services/constants";
import { Project } from "@/types/gestion";
import { LOCAL_STORAGE } from "@/utiles/services/storage";

type Props = {};

export default function Home({}: Props) {

  const allProject: Project[] = LOCAL_STORAGE.get('all_projects')
  const projects = allProject.filter((item) => item.type[0] === "INITIAL_INSPECTION")
  console.log('allPro =>', allProject)

  // Fetch all projects with type ["INITIAL_INSPECTION"] and pass it as props to Layout
  useEffect(() => {
    console.log("initial_inspection");
    
  }, []);

  return (
    <LayoutDashboard projectsPerType={projects} typeOfProject={["INITIAL_INSPECTION"]}>
      <ProjectDisplay projects={projects} />
    </LayoutDashboard>
  );
}
