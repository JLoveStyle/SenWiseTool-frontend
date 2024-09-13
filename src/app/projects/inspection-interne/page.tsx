"use client";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import ProjectDisplay from "@/components/organisms/projectsDisplay";
import { Project } from "@/types/gestion";
import { tableRaw } from "@/utiles/services/constants";
import { LOCAL_STORAGE } from "@/utiles/services/storage";
import React, { useEffect } from "react";

type Props = {};

export default function Home({}: Props) {

  const allProject: Project[] = LOCAL_STORAGE.get('all_projects')
  console.log('init pro', allProject)
  const projects = allProject.filter((item) => item?.type[0] === "INTERNAL_INSPECTION")
  console.log('allPro =>', allProject)

  // Fetech all projects xwith ["INTERNAL_INSPECTION"] and pass it as props to layout
  useEffect(() => {
    console.log("inspection interne")
  }, [])

  return (
    <LayoutDashboard typeOfProject={["INTERNAL_INSPECTION"]} projectsPerType={projects}>
      <ProjectDisplay projects={projects} />
    </LayoutDashboard>
  );
}
