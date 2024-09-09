"use client";
import ProjectDisplay from "@/components/organisms/projectsDisplay";
import LayoutDashboard from "@/components/organisms/layoutDashboard";
import React, { useEffect } from "react";
import { tableRaw } from "@/utiles/services/constants";

type Props = {};

export default function Home({}: Props) {

  // Fetch all projects with type ["INTERNAL_INSPECTION"] and pass it as props to Layout
  useEffect(() => {
    console.log("Auto-evaluation");
  }, []);

  return (
    <LayoutDashboard projectsPerType={[]} typeOfProject={["INTERNAL_INSPECTION"]}>
      <ProjectDisplay projects={tableRaw} />
    </LayoutDashboard>
  );
}
